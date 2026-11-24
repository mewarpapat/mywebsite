import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Check, FileText, Package, PlayCircle, ShoppingCart } from "lucide-react";
import { CATEGORIES, getProduct } from "../data/products";
import { useCart } from "../lib/cart";
import { ProductCover } from "../components/ProductCover";
import { FrameworkBadge } from "../components/FrameworkBadge";
import { Price } from "../components/Price";
import { thaiDate } from "../lib/format";
import { NotFound } from "./NotFound";

export function ScriptDetail() {
  const { id = "" } = useParams();
  const product = getProduct(id);
  const cart = useCart();
  const navigate = useNavigate();

  if (!product) return <NotFound />;
  const inCart = cart.has(product.id);

  const buyNow = () => {
    cart.add(product.id);
    navigate("/checkout");
  };

  const specs: [string, string][] = [
    ["หมวดหมู่", CATEGORIES[product.category]],
    ["เวอร์ชัน", product.version],
    ["อัปเดตล่าสุด", thaiDate(product.updated)],
    ["รูปแบบไฟล์", product.escrow ? "FiveM Asset Escrow" : "Open Source (แก้โค้ดได้)"],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/scripts" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> กลับไปหน้าสคริปต์
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="aspect-video overflow-hidden rounded-3xl border border-white/5">
            <ProductCover product={product} size="lg" />
          </div>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold text-white">รายละเอียด</h2>
            <p className="mt-3 leading-relaxed text-zinc-300">{product.description}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold text-white">ฟีเจอร์</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex gap-3 rounded-xl border border-white/5 bg-zinc-900/40 p-4 text-sm text-zinc-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {product.dependencies.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold text-white">Dependencies</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.dependencies.map((d) => (
                  <span key={d} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 font-mono text-sm text-zinc-300">
                    <Package className="h-3.5 w-3.5 text-zinc-500" />
                    {d}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8">
            {product.badge && (
              <span className="mb-3 inline-block rounded-full bg-emerald-400 px-2.5 py-0.5 text-xs font-bold text-zinc-950">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-3xl font-bold text-white">{product.name}</h1>
            <p className="mt-2 text-zinc-400">{product.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.frameworks.map((fw) => (
                <FrameworkBadge key={fw} fw={fw} />
              ))}
            </div>

            <div className="mt-6 border-t border-white/5 pt-6">
              <Price product={product} large />
              <p className="mt-1 text-xs text-zinc-500">ชำระครั้งเดียว · ใช้ได้ 1 เซิร์ฟเวอร์ · อัปเดตฟรี</p>
            </div>

            <div className="mt-6 grid gap-3">
              <button onClick={buyNow} className="btn-primary w-full">
                ซื้อเลย
              </button>
              <button
                onClick={() => (inCart ? cart.remove(product.id) : cart.add(product.id))}
                className="btn-ghost w-full"
              >
                {inCart ? <Check className="h-4 w-4 text-emerald-400" /> : <ShoppingCart className="h-4 w-4" />}
                {inCart ? "อยู่ในตะกร้าแล้ว (กดเพื่อเอาออก)" : "ใส่ตะกร้า"}
              </button>
            </div>

            <dl className="mt-8 space-y-3 text-sm">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-zinc-500">{k}</dt>
                  <dd className="text-right text-zinc-200">{v}</dd>
                </div>
              ))}
            </dl>

            {(product.previewUrl || product.docsUrl) && (
              <div className="mt-6 flex gap-3 border-t border-white/5 pt-6">
                {product.previewUrl && (
                  <a href={product.previewUrl} target="_blank" rel="noreferrer" className="btn-ghost flex-1 py-2.5 text-sm">
                    <PlayCircle className="h-4 w-4" /> ดูตัวอย่าง
                  </a>
                )}
                {product.docsUrl && (
                  <a href={product.docsUrl} target="_blank" rel="noreferrer" className="btn-ghost flex-1 py-2.5 text-sm">
                    <FileText className="h-4 w-4" /> เอกสาร
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
