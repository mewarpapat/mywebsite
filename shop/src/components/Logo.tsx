import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="ARP Development หน้าแรก">
      <img src="/favicon.svg" alt="" className="h-8 w-8 rounded-lg ring-1 ring-white/10" />
      <span className="font-display text-lg font-bold tracking-tight">
        ARP<span className="text-emerald-400">.</span>
        <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">Development</span>
      </span>
    </Link>
  );
}
