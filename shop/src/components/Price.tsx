import type { Product } from "../data/products";
import { baht } from "../lib/format";

export function Price({ product, large = false }: { product: Product; large?: boolean }) {
  const sale = product.salePrice !== undefined && product.salePrice < product.price;
  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-display font-bold text-white ${large ? "text-4xl" : "text-xl"}`}>
        {baht(sale ? product.salePrice! : product.price)}
      </span>
      {sale && <span className={`text-zinc-500 line-through ${large ? "text-lg" : "text-sm"}`}>{baht(product.price)}</span>}
    </div>
  );
}
