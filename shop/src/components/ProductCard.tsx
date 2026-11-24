import { Link } from "react-router";
import { Check, Plus } from "lucide-react";
import type { Product } from "../data/products";
import { useCart } from "../lib/cart";
import { ProductCover } from "./ProductCover";
import { FrameworkBadge } from "./FrameworkBadge";
import { Price } from "./Price";

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const inCart = cart.has(product.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 transition hover:-translate-y-1 hover:border-white/15 hover:bg-zinc-900/70">
      <Link to={`/scripts/${product.id}`} className="relative aspect-[16/10] overflow-hidden">
        <ProductCover product={product} />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-400 px-2.5 py-0.5 text-xs font-bold text-zinc-950">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300 backdrop-blur">
          {product.escrow ? "Escrow" : "Open Source"}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {product.frameworks.map((fw) => (
            <FrameworkBadge key={fw} fw={fw} />
          ))}
        </div>
        <Link to={`/scripts/${product.id}`}>
          <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-300">{product.name}</h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{product.tagline}</p>
        <div className="mt-auto flex items-end justify-between pt-5">
          <Price product={product} />
          <button
            onClick={() => (inCart ? cart.remove(product.id) : cart.add(product.id))}
            className={`flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition ${
              inCart ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white hover:bg-emerald-400 hover:text-zinc-950"
            }`}
            aria-label={inCart ? `เอา ${product.name} ออกจากตะกร้า` : `เพิ่ม ${product.name} ลงตะกร้า`}
          >
            {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {inCart ? "ในตะกร้า" : "ใส่ตะกร้า"}
          </button>
        </div>
      </div>
    </article>
  );
}
