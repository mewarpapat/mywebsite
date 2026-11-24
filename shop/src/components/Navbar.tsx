import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "../lib/cart";
import { SHOP } from "../config";

const links = [
  { to: "/", label: "หน้าแรก", end: true },
  { to: "/scripts", label: "สคริปต์ทั้งหมด" },
  { to: "/faq", label: "วิธีสั่งซื้อ / FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { ids } = useCart();

  const cls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={cls}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SHOP.discordInvite}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#8b96ff] hover:bg-[#5865F2]/10 sm:block"
          >
            Discord
          </a>
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
            aria-label={`ตะกร้า ${ids.length} รายการ`}
          >
            <ShoppingCart className="h-5 w-5" />
            {ids.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 font-mono text-[11px] font-bold text-zinc-950">
                {ids.length}
              </span>
            )}
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-300 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="เมนู"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-zinc-950 px-4 pb-4 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-3 text-base ${isActive ? "bg-white/5 text-white" : "text-zinc-400"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a href={SHOP.discordInvite} target="_blank" rel="noreferrer" className="block px-3 py-3 text-[#8b96ff]">
            เข้าร่วม Discord
          </a>
        </div>
      )}
    </header>
  );
}
