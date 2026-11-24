import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import { CATEGORIES, FRAMEWORKS, PRODUCTS, finalPrice, type Category, type Framework } from "../data/products";
import { ProductCard } from "../components/ProductCard";

type Sort = "popular" | "new" | "price-asc" | "price-desc";

export function Scripts() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const cat = (params.get("cat") ?? "") as Category | "";
  const fw = (params.get("fw") ?? "") as Framework | "";
  const sort = (params.get("sort") ?? "popular") as Sort;

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const out = PRODUCTS.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!fw || p.frameworks.includes(fw)) &&
        (!term || `${p.name} ${p.tagline} ${p.id}`.toLowerCase().includes(term)),
    );
    switch (sort) {
      case "new":
        return [...out].sort((a, b) => b.updated.localeCompare(a.updated));
      case "price-asc":
        return [...out].sort((a, b) => finalPrice(a) - finalPrice(b));
      case "price-desc":
        return [...out].sort((a, b) => finalPrice(b) - finalPrice(a));
      default:
        return out;
    }
  }, [q, cat, fw, sort]);

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition ${
      active ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200" : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white">สคริปต์ทั้งหมด</h1>
      <p className="mt-2 text-zinc-400">เลือกระบบที่ใช่สำหรับเซิร์ฟเวอร์ของคุณ</p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            className="input pl-11"
            placeholder="ค้นหาสคริปต์..."
            value={q}
            onChange={(e) => set("q", e.target.value)}
          />
        </label>
        <select className="input md:w-48" value={fw} onChange={(e) => set("fw", e.target.value)} aria-label="Framework">
          <option value="">ทุก Framework</option>
          {FRAMEWORKS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <select className="input md:w-48" value={sort} onChange={(e) => set("sort", e.target.value === "popular" ? "" : e.target.value)} aria-label="เรียงตาม">
          <option value="popular">แนะนำ</option>
          <option value="new">อัปเดตล่าสุด</option>
          <option value="price-asc">ราคา ต่ำ → สูง</option>
          <option value="price-desc">ราคา สูง → ต่ำ</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className={chip(!cat)} onClick={() => set("cat", "")}>ทั้งหมด</button>
        {(Object.keys(CATEGORIES) as Category[]).map((c) => (
          <button key={c} className={chip(cat === c)} onClick={() => set("cat", c)}>
            {CATEGORIES[c]}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-2xl border border-dashed border-white/10 p-12 text-center text-zinc-400">
          ไม่พบสคริปต์ที่ตรงกับเงื่อนไข
        </div>
      )}
    </div>
  );
}
