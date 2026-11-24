import { Link, useLocation, useParams } from "react-router";
import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";
import { SHOP } from "../config";
import { baht } from "../lib/format";

export function OrderSuccess() {
  const { orderId = "" } = useParams();
  const state = useLocation().state as { total?: number; items?: string[] } | null;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
      <h1 className="mt-6 font-display text-3xl font-bold text-white">ได้รับคำสั่งซื้อแล้ว!</h1>
      <p className="mt-3 text-zinc-400">ทีมงานกำลังตรวจสอบสลิป เมื่อยืนยันแล้วจะส่งสคริปต์ให้ทาง Discord</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-left">
        <p className="text-sm text-zinc-500">เลขที่คำสั่งซื้อ</p>
        <button onClick={copy} className="mt-1 flex items-center gap-2 font-mono text-2xl font-bold text-white hover:text-emerald-300">
          {orderId} <Copy className="h-4 w-4" />
        </button>
        {copied && <span className="text-xs text-emerald-300">คัดลอกแล้ว</span>}
        {state?.items && (
          <ul className="mt-4 space-y-1 border-t border-white/5 pt-4 text-sm text-zinc-300">
            {state.items.map((n) => <li key={n}>• {n}</li>)}
          </ul>
        )}
        {state?.total !== undefined && (
          <p className="mt-4 flex justify-between font-semibold text-white">
            <span>ยอดชำระ</span><span>{baht(state.total)}</span>
          </p>
        )}
      </div>

      <ol className="mt-8 space-y-3 text-left text-sm text-zinc-300">
        <li><span className="font-mono text-emerald-400">01</span> เข้า Discord ของร้าน</li>
        <li><span className="font-mono text-emerald-400">02</span> เปิด Ticket แล้วแจ้งเลขที่คำสั่งซื้อ <span className="font-mono text-white">{orderId}</span></li>
        <li><span className="font-mono text-emerald-400">03</span> รับไฟล์สคริปต์ / Asset ผ่าน Keymaster</li>
      </ol>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <a href={SHOP.discordInvite} target="_blank" rel="noreferrer" className="btn-primary">เข้า Discord</a>
        <Link to="/scripts" className="btn-ghost">กลับไปร้านค้า</Link>
      </div>
    </div>
  );
}
