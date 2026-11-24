import { Link } from "react-router";
import { ArrowRight, Headphones, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { SHOP } from "../config";

const perks = [
  { icon: Zap, title: "เบาเครื่อง", text: "ทุกสคริปต์ทดสอบ resmon ก่อนปล่อย ไม่กินทรัพยากรเซิร์ฟ" },
  { icon: RefreshCw, title: "อัปเดตฟรีตลอดอายุ", text: "ซื้อครั้งเดียว รับเวอร์ชันใหม่ฟรีผ่าน Keymaster / Discord" },
  { icon: Headphones, title: "ซัพพอร์ตภาษาไทย", text: "ช่วยติดตั้งและแก้ปัญหาผ่าน Discord ticket" },
  { icon: ShieldCheck, title: "ชำระเงินปลอดภัย", text: "โอนผ่าน PromptPay ตรวจสลิปและส่งของภายในวัน" },
];

export function Home() {
  const featured = [...PRODUCTS.filter((p) => p.badge), ...PRODUCTS.filter((p) => !p.badge)].slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 md:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            FiveM Scripts · ESX · QBCore · QBox
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            สคริปต์ FiveM ที่ทำให้เซิร์ฟของคุณ
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"> โดดเด่นกว่าใคร</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            ระบบคุณภาพจาก {SHOP.name} ออกแบบ UI สวย โค้ดสะอาด ปรับแต่งง่ายผ่าน config พร้อมซัพพอร์ตหลังการขาย
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/scripts" className="btn-primary">
              ดูสคริปต์ทั้งหมด <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={SHOP.discordInvite} target="_blank" rel="noreferrer" className="btn-ghost">
              เข้าร่วม Discord
            </a>
          </div>
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            {[
              [String(PRODUCTS.length) + "+", "สคริปต์"],
              ["24 ชม.", "ส่งของหลังตรวจสลิป"],
              ["ฟรี", "อัปเดตตลอดอายุ"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{n}</dt>
                <dd className="mt-1 text-xs text-zinc-400 sm:text-sm">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">สคริปต์แนะนำ</h2>
            <p className="mt-2 text-zinc-400">ตัวขายดีและตัวใหม่ล่าสุดของร้าน</p>
          </div>
          <Link to="/scripts" className="hidden items-center gap-1 text-sm font-medium text-emerald-300 hover:text-emerald-200 sm:flex">
            ดูทั้งหมด <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-white/5 bg-zinc-900/40 p-6">
              <Icon className="h-7 w-7 text-emerald-400" />
              <h3 className="mt-4 font-semibold text-white">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-cyan-500/10 p-10 text-center md:p-14">
          <h2 className="font-display text-3xl font-bold text-white">อยากได้สคริปต์สั่งทำพิเศษ?</h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            รับพัฒนาระบบตามความต้องการของเซิร์ฟคุณ ปรึกษาฟรีผ่าน Discord
          </p>
          <a href={SHOP.discordInvite} target="_blank" rel="noreferrer" className="btn-primary mt-8">
            เปิด Ticket ใน Discord
          </a>
        </div>
      </section>
    </>
  );
}
