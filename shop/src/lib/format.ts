const thb = new Intl.NumberFormat("th-TH", { maximumFractionDigits: 2 });
export const baht = (n: number) => `฿${thb.format(n)}`;

export function thaiDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
