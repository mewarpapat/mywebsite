import { SHOP } from "../config";

const steps = [
  ["เลือกสคริปต์", "กดใส่ตะกร้าหรือ “ซื้อเลย” ที่หน้าสินค้า"],
  ["กรอกข้อมูล", "ใส่ชื่อ, Discord และบัญชี Cfx.re (สำหรับสคริปต์ Escrow)"],
  ["สแกน PromptPay", "QR มียอดเงินให้อัตโนมัติ โอนแล้วแนบสลิป"],
  ["รับสคริปต์", "ทีมงานตรวจสลิปแล้วส่งของทาง Discord / Keymaster"],
];

const faqs = [
  ["ใช้กับ Framework อะไรได้บ้าง?", "แต่ละสคริปต์ระบุไว้ที่หน้าสินค้า ส่วนใหญ่รองรับ ESX, QBCore และ QBox โดยตั้งค่าใน config ไฟล์เดียว"],
  ["Escrow กับ Open Source ต่างกันอย่างไร?", "Escrow คือไฟล์ที่ล็อกโค้ดหลักผ่านระบบ FiveM Asset Escrow แต่ยังแก้ config/ภาษาได้ ส่วน Open Source จะได้ซอร์สโค้ดทั้งหมด แก้ไขได้อิสระ"],
  ["ได้รับสคริปต์ภายในกี่ชั่วโมง?", "ปกติภายในไม่กี่ชั่วโมงหลังตรวจสลิป ไม่เกิน 24 ชั่วโมง"],
  ["อัปเดตฟรีไหม?", "ฟรีตลอดอายุสินค้า เวอร์ชันใหม่จะส่งผ่าน Keymaster หรือช่องอัปเดตใน Discord"],
  ["ใช้ได้กี่เซิร์ฟเวอร์?", "1 License ต่อ 1 เซิร์ฟเวอร์ (รวมเซิร์ฟเทสต์ของคุณเอง)"],
  ["ขอคืนเงินได้ไหม?", "สินค้าดิจิทัลไม่สามารถคืนเงินได้หลังส่งไฟล์แล้ว หากสคริปต์มีปัญหาเราช่วยแก้ไขให้จนใช้งานได้"],
  ["ช่วยติดตั้งให้ไหม?", `ได้ เปิด Ticket ใน Discord ของ ${SHOP.name} ทีมงานช่วยติดตั้งและตั้งค่าเบื้องต้นให้ฟรี`],
];

export function Faq() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white">วิธีสั่งซื้อ</h1>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2">
        {steps.map(([t, d], i) => (
          <li key={t} className="rounded-2xl border border-white/5 bg-zinc-900/40 p-5">
            <span className="font-mono text-sm text-emerald-400">0{i + 1}</span>
            <h2 className="mt-1 font-semibold text-white">{t}</h2>
            <p className="mt-1 text-sm text-zinc-400">{d}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-16 font-display text-3xl font-bold text-white">คำถามที่พบบ่อย</h2>
      <div className="mt-6 divide-y divide-white/5 rounded-2xl border border-white/5 bg-zinc-900/40">
        {faqs.map(([q, a]) => (
          <details key={q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white">
              {q}
              <span className="text-xl text-zinc-500 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
