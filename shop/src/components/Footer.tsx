import { Link } from "react-router";
import { Logo } from "./Logo";
import { SHOP } from "../config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
            พัฒนาสคริปต์ FiveM คุณภาพสำหรับเซิร์ฟเวอร์ Roleplay เน้นประสิทธิภาพ ปรับแต่งง่าย และซัพพอร์ตจริงจังผ่าน Discord
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">ร้านค้า</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link to="/scripts" className="hover:text-white">สคริปต์ทั้งหมด</Link></li>
            <li><Link to="/cart" className="hover:text-white">ตะกร้าสินค้า</Link></li>
            <li><Link to="/faq" className="hover:text-white">วิธีสั่งซื้อ / FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-white">เงื่อนไขการใช้งาน</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">ติดต่อ</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><a href={SHOP.discordInvite} target="_blank" rel="noreferrer" className="hover:text-white">Discord</a></li>
            {SHOP.facebook && <li><a href={SHOP.facebook} target="_blank" rel="noreferrer" className="hover:text-white">Facebook</a></li>}
            {SHOP.email && <li><a href={`mailto:${SHOP.email}`} className="hover:text-white">{SHOP.email}</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {SHOP.name} · ไม่มีส่วนเกี่ยวข้องกับ Rockstar Games หรือ Cfx.re
      </div>
    </footer>
  );
}
