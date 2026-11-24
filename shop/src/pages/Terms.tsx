import { SHOP } from "../config";

const terms = [
  "สินค้าทั้งหมดเป็นสินค้าดิจิทัล เมื่อส่งไฟล์หรือโอน Asset แล้วไม่สามารถคืนเงินได้",
  "1 License ใช้ได้กับ 1 เซิร์ฟเวอร์ ห้ามแจกจ่าย ขายต่อ หรือนำไฟล์ไปเผยแพร่ ไม่ว่ากรณีใด",
  "สคริปต์ Open Source สามารถแก้ไขเพื่อใช้ในเซิร์ฟเวอร์ของคุณได้ แต่ห้ามนำไปขายหรือแจกในนามของคุณ",
  "หากตรวจพบการละเมิด ทางร้านขอสงวนสิทธิ์ยกเลิก License และงดการซัพพอร์ตโดยไม่คืนเงิน",
  "การซัพพอร์ตครอบคลุมการติดตั้งและบั๊กของสคริปต์ ไม่รวมการแก้ไขสคริปต์ของบุคคลที่สาม",
  "ราคาและรายละเอียดสินค้าอาจเปลี่ยนแปลงได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
];

export function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white">เงื่อนไขการใช้งาน</h1>
      <p className="mt-3 text-zinc-400">การสั่งซื้อสินค้าจาก {SHOP.name} ถือว่าคุณยอมรับเงื่อนไขต่อไปนี้</p>
      <ol className="mt-8 space-y-4">
        {terms.map((t, i) => (
          <li key={i} className="flex gap-4 rounded-xl border border-white/5 bg-zinc-900/40 p-4 text-sm leading-relaxed text-zinc-300">
            <span className="font-mono text-emerald-400">{String(i + 1).padStart(2, "0")}</span>
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}
