// Cloudflare Pages Function: POST /api/order
// รับคำสั่งซื้อ + สลิป แล้วส่งเข้า Discord ผ่าน webhook (ตั้ง DISCORD_WEBHOOK_URL เป็น secret)
import { PRODUCTS, finalPrice } from "../../src/data/products";

interface Env {
  DISCORD_WEBHOOK_URL?: string;
}

const MAX_SLIP = 5 * 1024 * 1024;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });

function field(fd: FormData, key: string, max: number, required = false): string {
  const v = fd.get(key);
  const s = typeof v === "string" ? v.trim().slice(0, max) : "";
  if (required && !s) throw new Error(`กรุณากรอก ${key}`);
  return s;
}

function orderId() {
  const d = new Date(Date.now() + 7 * 3600_000); // เวลาไทย
  const ymd = d.toISOString().slice(2, 10).replace(/-/g, "");
  const rnd = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(6, "0").slice(-6);
  return `ARP-${ymd}-${rnd}`;
}

const clean = (s: string) => s.replace(/[`*_~|>]/g, "\\$&") || "-";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DISCORD_WEBHOOK_URL) {
    return json({ error: "ระบบสั่งซื้อยังไม่ได้ตั้งค่า กรุณาติดต่อร้านทาง Discord" }, 503);
  }

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return json({ error: "ข้อมูลไม่ถูกต้อง" }, 400);
  }

  try {
    const name = field(fd, "name", 80, true);
    const discord = field(fd, "discord", 40, true);
    const email = field(fd, "email", 120);
    const cfx = field(fd, "cfx", 60);
    const note = field(fd, "note", 500);

    let ids: unknown;
    try {
      ids = JSON.parse(field(fd, "items", 2000, true));
    } catch {
      ids = null;
    }
    if (!Array.isArray(ids) || !ids.length) throw new Error("ไม่มีสินค้าในคำสั่งซื้อ");
    const items = [...new Set(ids)].map((id) => PRODUCTS.find((p) => p.id === id));
    if (items.some((p) => !p)) throw new Error("พบสินค้าที่ไม่มีในร้าน กรุณารีเฟรชหน้าแล้วลองใหม่");
    const products = items as NonNullable<(typeof items)[number]>[];
    if (products.some((p) => p.escrow) && !cfx) throw new Error("กรุณากรอกชื่อบัญชี Cfx.re");

    const slip = fd.get("slip") as unknown as File | string | null;
    if (!slip || typeof slip === "string" || !slip.size) throw new Error("กรุณาแนบสลิป");
    if (!slip.type.startsWith("image/")) throw new Error("สลิปต้องเป็นรูปภาพ");
    if (slip.size > MAX_SLIP) throw new Error("ไฟล์สลิปต้องไม่เกิน 5MB");

    const total = products.reduce((s, p) => s + finalPrice(p), 0); // คำนวณราคาฝั่งเซิร์ฟเวอร์เสมอ
    const id = orderId();
    const ext = (slip.type.split("/")[1] || "png").replace(/[^a-z0-9]/gi, "").slice(0, 5);
    const slipName = `slip-${id}.${ext}`;

    const payload = {
      username: "ARP Shop",
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: `🛒 คำสั่งซื้อใหม่ ${id}`,
          color: 0x34d399,
          fields: [
            { name: "ยอดชำระ", value: `**฿${total.toLocaleString("th-TH")}**`, inline: true },
            { name: "Discord", value: clean(discord), inline: true },
            { name: "Cfx.re", value: clean(cfx), inline: true },
            { name: "ชื่อ", value: clean(name), inline: true },
            { name: "อีเมล", value: clean(email), inline: true },
            { name: "สินค้า", value: products.map((p) => `• ${p.name} — ฿${finalPrice(p)}`).join("\n") },
            ...(note ? [{ name: "หมายเหตุ", value: clean(note) }] : []),
          ],
          image: { url: `attachment://${slipName}` },
          footer: { text: request.headers.get("cf-connecting-ip") ?? "" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const body = new FormData();
    body.set("payload_json", JSON.stringify(payload));
    body.set("files[0]", new File([await slip.arrayBuffer()], slipName, { type: slip.type }));

    const res = await fetch(env.DISCORD_WEBHOOK_URL, { method: "POST", body });
    if (!res.ok) {
      console.error("discord webhook failed", res.status, await res.text());
      return json({ error: "ส่งคำสั่งซื้อไม่สำเร็จ กรุณาลองใหม่หรือติดต่อร้านทาง Discord" }, 502);
    }

    return json({ orderId: id, total });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "ข้อมูลไม่ถูกต้อง" }, 400);
  }
};

export const onRequest: PagesFunction<Env> = () => json({ error: "Method not allowed" }, 405);
