import type { Framework } from "../data/products";

const COLORS: Record<Framework, string> = {
  ESX: "border-amber-400/30 text-amber-300",
  QBCore: "border-red-400/30 text-red-300",
  QBox: "border-sky-400/30 text-sky-300",
  Standalone: "border-zinc-400/30 text-zinc-300",
};

export function FrameworkBadge({ fw }: { fw: Framework }) {
  return (
    <span className={`rounded-md border bg-white/[0.03] px-1.5 py-0.5 font-mono text-[11px] font-medium ${COLORS[fw]}`}>
      {fw}
    </span>
  );
}
