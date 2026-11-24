# ARP Development — Script Shop

ร้านขายสคริปต์ FiveM สำหรับ **https://shop.arpdevelopment.com**
Vite + React + Tailwind รันบน **Cloudflare Pages** (+ Pages Functions สำหรับรับออเดอร์)

## ระบบการสั่งซื้อ

1. ลูกค้าเลือกสคริปต์ → ตะกร้า → หน้าชำระเงิน
2. หน้าเว็บสร้าง **PromptPay QR พร้อมยอดเงิน** ให้อัตโนมัติ
3. ลูกค้ากรอก Discord / บัญชี Cfx.re แล้วแนบสลิป
4. `POST /api/order` (`functions/api/order.ts`) ตรวจข้อมูล **คำนวณราคาใหม่ฝั่งเซิร์ฟเวอร์** แล้วส่ง embed + รูปสลิปเข้า Discord webhook
5. ลูกค้าได้เลขออเดอร์ `ARP-YYMMDD-XXXXXX` ไปเปิด ticket ใน Discord เพื่อรับของ

## สิ่งที่ต้องแก้ก่อนเปิดร้าน

| ไฟล์ / ค่า | ทำอะไร |
|---|---|
| `src/config.ts` | ลิงก์ Discord, ชื่อบัญชี PromptPay, Facebook, อีเมล |
| `src/data/products.ts` | รายการสคริปต์ ราคา ฟีเจอร์ (ตอนนี้เป็นข้อมูลตัวอย่าง) — ใส่ `image` เป็นรูปปกจริงได้ (วางไฟล์ใน `public/images/`) |
| `VITE_PROMPTPAY_ID` (build env) | เบอร์ PromptPay 10 หลัก หรือเลขบัตร 13 หลัก |
| `DISCORD_WEBHOOK_URL` (secret) | Webhook ของห้องที่ให้ออเดอร์เด้งเข้า |

## พัฒนาในเครื่อง

```bash
cd shop
npm install
npm run dev                 # หน้าเว็บอย่างเดียว
# ทดสอบ API ด้วย: สร้างไฟล์ .dev.vars ใส่ DISCORD_WEBHOOK_URL=... แล้ว
npm run pages:dev
```

## Deploy ไป Cloudflare Pages

### ทางเลือก A — เชื่อม GitHub ใน Dashboard (ง่ายสุด)
Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → เลือก repo นี้
- Production branch: `main`
- Root directory: `shop`
- Build command: `npm run build`
- Build output: `dist`
- Environment variables: `VITE_PROMPTPAY_ID` (plain), `DISCORD_WEBHOOK_URL` (secret)

### ทางเลือก B — GitHub Actions (`.github/workflows/deploy-shop.yml`)
ตั้งค่าใน GitHub repo → Settings → Secrets and variables → Actions
- Secret `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Variable `PROMPTPAY_ID`

แล้ว push เข้า `main` ระบบจะ deploy ให้เอง (อย่าใช้ A กับ B พร้อมกัน)

## โดเมน + DNS (shop.arpdevelopment.com)

**ผ่าน Dashboard:** Pages → `arp-shop` → Custom domains → Set up a domain → `shop.arpdevelopment.com`
ถ้า `arpdevelopment.com` อยู่ใน Cloudflare บัญชีเดียวกัน ระบบจะสร้าง CNAME ให้อัตโนมัติ

**ผ่านสคริปต์:** (ต้องมี token สิทธิ์ *Pages: Edit* + *Zone DNS: Edit*)
```bash
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... ./scripts/setup-cloudflare.sh
```
สคริปต์จะสร้าง Pages project (ถ้ายังไม่มี) ผูก custom domain และสร้าง DNS record
`CNAME shop → arp-shop.pages.dev` (Proxied)
