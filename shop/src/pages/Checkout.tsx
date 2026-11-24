import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import QRCode from "qrcode";
import { AlertCircle, Loader2, Upload } from "lucide-react";
import { useCart } from "../lib/cart";
import { promptpayPayload } from "../lib/promptpay";
import { baht } from "../lib/format";
import { SHOP } from "../config";

const MAX_SLIP = 5 * 1024 * 1024;

export function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const [qr, setQr] = useState("");
  const [slip, setSlip] = useState<File | null>(null);
  const [slipPreview, setSlipPreview] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const needsCfx = useMemo(() => cart.items.some((p) => p.escrow), [cart.items]);

  useEffect(() => {
    if (!cart.total) return;
    QRCode.toDataURL(promptpayPayload(SHOP.promptpayId, cart.total), { margin: 1, width: 320 })
      .then(setQr)
      .catch(() => setQr(""));
  }, [cart.total]);

  useEffect(() => {
    if (!slip) {
      setSlipPreview("");
      return;
    }
    const url = URL.createObjectURL(slip);
    setSlipPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [slip]);

  if (!cart.items.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-white">ยังไม่มีสินค้าในตะกร้า</h1>
        <Link to="/scripts" className="btn-primary mt-8">เลือกซื้อสคริปต์</Link>
      </div>
    );
  }

  const onSlip = (f: File | undefined) => {
    setError("");
    if (!f) return setSlip(null);
    if (!f.type.startsWith("image/")) return setError("สลิปต้องเป็นไฟล์รูปภาพ");
    if (f.size > MAX_SLIP) return setError("ไฟล์สลิปต้องไม่เกิน 5MB");
    setSlip(f);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!slip) return setError("กรุณาแนบสลิปการโอนเงิน");
    const fd = new FormData(e.currentTarget);
    fd.set("items", JSON.stringify(cart.ids));
    fd.set("slip", slip);
    setSending(true);
    try {
      const res = await fetch("/api/order", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { orderId?: string; total?: number; error?: string };
      if (!res.ok || !data.orderId) throw new Error(data.error || "ส่งคำสั่งซื้อไม่สำเร็จ กรุณาลองใหม่");
      const items = cart.items.map((p) => p.name);
      cart.clear();
      navigate(`/order/${data.orderId}`, { state: { total: data.total, items } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white">ชำระเงิน</h1>
      <p className="mt-2 text-zinc-400">โอนผ่าน PromptPay แล้วแนบสลิป ทีมงานจะตรวจสอบและส่งสคริปต์ให้ทาง Discord</p>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <fieldset className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6">
            <legend className="px-2 text-sm font-semibold text-emerald-300">1. ข้อมูลผู้ซื้อ</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="ชื่อ-นามสกุล / ชื่อเซิร์ฟ" name="name" required maxLength={80} />
              <Field label="Discord username" name="discord" required maxLength={40} placeholder="เช่น arp.dev" />
              <Field label="อีเมล (ไม่บังคับ)" name="email" type="email" maxLength={120} />
              <Field
                label={needsCfx ? "ชื่อบัญชี Cfx.re (Keymaster)" : "ชื่อบัญชี Cfx.re (ไม่บังคับ)"}
                name="cfx"
                required={needsCfx}
                maxLength={60}
                hint={needsCfx ? "ใช้สำหรับโอน Asset Escrow เข้าบัญชีของคุณ" : undefined}
              />
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm text-zinc-300">หมายเหตุ (ไม่บังคับ)</span>
              <textarea name="note" rows={3} maxLength={500} className="input resize-none" />
            </label>
          </fieldset>

          <fieldset className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6">
            <legend className="px-2 text-sm font-semibold text-emerald-300">2. สแกนจ่าย PromptPay</legend>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="rounded-2xl bg-white p-3">
                {qr ? <img src={qr} alt="PromptPay QR" className="h-52 w-52" /> : <div className="h-52 w-52 animate-pulse rounded-lg bg-zinc-200" />}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-zinc-400">ยอดที่ต้องโอน</p>
                <p className="font-display text-4xl font-bold text-white">{baht(cart.total)}</p>
                <p className="mt-4 text-sm text-zinc-400">ชื่อบัญชี</p>
                <p className="font-medium text-zinc-100">{SHOP.promptpayName}</p>
                <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                  สแกนด้วยแอปธนาคารใดก็ได้ ยอดเงินจะถูกกรอกให้อัตโนมัติ<br />กรุณาโอนให้ตรงยอดเพื่อความรวดเร็วในการตรวจสอบ
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6">
            <legend className="px-2 text-sm font-semibold text-emerald-300">3. แนบสลิป</legend>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-zinc-950/50 p-6 text-center transition hover:border-emerald-400/40">
              {slipPreview ? (
                <img src={slipPreview} alt="ตัวอย่างสลิป" className="max-h-64 rounded-lg" />
              ) : (
                <Upload className="h-8 w-8 text-zinc-500" />
              )}
              <span className="text-sm text-zinc-300">{slip ? slip.name : "คลิกเพื่อเลือกไฟล์สลิป (JPG/PNG ไม่เกิน 5MB)"}</span>
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => onSlip(e.target.files?.[0])} />
            </label>
          </fieldset>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="font-semibold text-white">รายการสั่งซื้อ</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {cart.items.map((p) => (
                <li key={p.id} className="flex justify-between gap-3">
                  <span className="text-zinc-300">{p.name}</span>
                  <span className="shrink-0 text-zinc-100">{baht(p.salePrice ?? p.price)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-white/5 pt-4 font-semibold text-white">
              <span>ยอดรวม</span>
              <span className="font-display text-xl">{baht(cart.total)}</span>
            </div>

            <label className="mt-6 flex gap-3 text-sm text-zinc-400">
              <input type="checkbox" required className="mt-1 h-4 w-4 accent-emerald-400" />
              <span>
                ฉันยอมรับ <Link to="/terms" target="_blank" className="text-emerald-300 underline">เงื่อนไขการใช้งาน</Link> และเข้าใจว่าสินค้าดิจิทัลไม่สามารถคืนเงินได้
              </span>
            </label>

            {error && (
              <p className="mt-4 flex gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
              </p>
            )}

            <button type="submit" disabled={sending} className="btn-primary mt-6 w-full">
              {sending && <Loader2 className="h-4 w-4 animate-spin" />}
              {sending ? "กำลังส่งคำสั่งซื้อ..." : "ยืนยันคำสั่งซื้อ"}
            </button>
          </div>
          <p className="px-2 text-xs leading-relaxed text-zinc-500">
            หลังยืนยัน กรุณาเข้า Discord ของร้านเพื่อรับสคริปต์ ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label, hint, ...props
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-zinc-300">
        {label} {props.required && <span className="text-emerald-400">*</span>}
      </span>
      <input className="input" {...props} />
      {hint && <span className="mt-1 block text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}
