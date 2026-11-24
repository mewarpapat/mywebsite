import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, finalPrice, type Product } from "../data/products";

const KEY = "arp-cart-v1";

interface CartCtx {
  items: Product[];
  ids: string[];
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
  subtotal: number;
}

const Ctx = createContext<CartCtx | null>(null);

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const ids = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(ids) ? ids.filter((id) => PRODUCTS.some((p) => p.id === id)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* storage อาจถูกปิด */
    }
  }, [ids]);

  const value = useMemo<CartCtx>(() => {
    const items = ids.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
    return {
      items,
      ids,
      has: (id) => ids.includes(id),
      // สคริปต์เป็น license — 1 ชิ้นต่อออเดอร์
      add: (id) => setIds((cur) => (cur.includes(id) ? cur : [...cur, id])),
      remove: (id) => setIds((cur) => cur.filter((x) => x !== id)),
      clear: () => setIds([]),
      subtotal: items.reduce((s, p) => s + p.price, 0),
      total: items.reduce((s, p) => s + finalPrice(p), 0),
    };
  }, [ids]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
