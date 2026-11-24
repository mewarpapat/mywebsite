// ===== ตั้งค่าร้าน — แก้ไขค่าด้านล่างให้เป็นของคุณ =====
export const SHOP = {
  name: "ARP Development",
  domain: "shop.arpdevelopment.com",
  discordInvite: "https://discord.gg/your-invite", // TODO: ลิงก์เชิญ Discord ของร้าน
  facebook: "", // ใส่ลิงก์เพจ (เว้นว่างได้)
  email: "", // อีเมลติดต่อ (เว้นว่างได้)
  /**
   * PromptPay: เบอร์มือถือ (10 หลัก) หรือเลขบัตรประชาชน/เลขผู้เสียภาษี (13 หลัก)
   * ตั้งผ่าน env ตอน build ได้ด้วย VITE_PROMPTPAY_ID
   */
  promptpayId: (import.meta.env.VITE_PROMPTPAY_ID as string | undefined) ?? "0000000000",
  promptpayName: "ARP Development", // ชื่อบัญชีที่ลูกค้าจะเห็นตอนโอน
};
