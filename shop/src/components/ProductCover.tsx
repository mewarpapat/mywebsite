import {
  Car, Fuel, Gauge, Hammer, Home, Monitor, ParkingSquare, Siren, Smartphone, Tablet, type LucideIcon,
} from "lucide-react";
import type { IconName, Product } from "../data/products";

const ICONS: Record<IconName, LucideIcon> = {
  tablet: Tablet,
  garage: ParkingSquare,
  phone: Smartphone,
  gauge: Gauge,
  car: Car,
  house: Home,
  hammer: Hammer,
  fuel: Fuel,
  monitor: Monitor,
  siren: Siren,
};

export function ProductCover({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  if (product.image) {
    return <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />;
  }
  const Icon = ICONS[product.icon];
  const h = product.hue;
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        backgroundColor: `hsl(${h} 40% 8%)`,
        backgroundImage: `radial-gradient(circle at 30% 20%, hsl(${h} 90% 55% / 0.35), transparent 55%), radial-gradient(circle at 80% 90%, hsl(${(h + 40) % 360} 90% 50% / 0.25), transparent 50%)`,
      }}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <Icon
        className={size === "lg" ? "relative h-28 w-28" : "relative h-14 w-14 transition-transform duration-500 group-hover:scale-110"}
        style={{ color: `hsl(${h} 90% 75%)` }}
        strokeWidth={1.4}
      />
      <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-widest text-white/40">
        {product.id}
      </span>
    </div>
  );
}
