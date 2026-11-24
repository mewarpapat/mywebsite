import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-mono text-6xl font-bold text-emerald-400">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">ไม่พบหน้าที่คุณต้องการ</h1>
      <Link to="/" className="btn-primary mt-8">กลับหน้าแรก</Link>
    </div>
  );
}
