import { Link } from "react-router";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../lib/cart";
import { ProductCover } from "../components/ProductCover";
import { Price } from "../components/Price";
import { baht } from "../lib/format";

export function Cart() {
  const cart = useCart();

  if (!cart.items.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-zinc-600" />
        <h1 className="mt-6 font-display text-3xl font-bold text-white">ตะกร้ายังว่างอยู่</h1>
        <p className="mt-2 text-zinc-400">เลือกสคริปต์ที่ถูกใจแล้วกลับมาที่นี่</p>
        <Link to="/scripts" className="btn-primary mt-8">เลือกซื้อสคริปต์</Link>
      </div>
    );
  }

  const discount = cart.subtotal - cart.total;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white">ตะกร้าสินค้า</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-3">
          {cart.items.map((p) => (
            <li key={p.id} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-3">
              <Link to={`/scripts/${p.id}`} className="h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-32">
                <ProductCover product={p} />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/scripts/${p.id}`} className="block truncate font-semibold text-white hover:text-emerald-300">
                  {p.name}
                </Link>
                <p className="truncate text-sm text-zinc-500">{p.frameworks.join(" · ")}</p>
                <div className="mt-1 sm:hidden"><Price product={p} /></div>
              </div>
              <div className="hidden sm:block"><Price product={p} /></div>
              <button
                onClick={() => cart.remove(p.id)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                aria-label={`ลบ ${p.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
          <h2 className="font-semibold text-white">สรุปคำสั่งซื้อ</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400"><dt>ราคาสินค้า ({cart.items.length})</dt><dd>{baht(cart.subtotal)}</dd></div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-300"><dt>ส่วนลด</dt><dd>-{baht(discount)}</dd></div>
            )}
            <div className="flex justify-between border-t border-white/5 pt-3 text-base font-semibold text-white">
              <dt>ยอดชำระ</dt><dd className="font-display text-xl">{baht(cart.total)}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="btn-primary mt-6 w-full">ดำเนินการชำระเงิน</Link>
          <Link to="/scripts" className="mt-3 block text-center text-sm text-zinc-400 hover:text-white">เลือกซื้อต่อ</Link>
        </div>
      </div>
    </div>
  );
}
