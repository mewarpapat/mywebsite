// แคตตาล็อกสินค้า — ใช้ทั้งหน้าเว็บและ API (/api/order คำนวณราคาจากไฟล์นี้ ไม่เชื่อราคาจาก browser)
export type Framework = "ESX" | "QBCore" | "QBox" | "Standalone";
export type Category = "job" | "ui" | "vehicle" | "housing" | "utility";

export interface Product {
  id: string; // slug ใช้ใน URL
  name: string;
  tagline: string;
  description: string;
  category: Category;
  price: number; // บาท
  salePrice?: number;
  frameworks: Framework[];
  features: string[];
  dependencies: string[];
  version: string;
  updated: string; // YYYY-MM-DD
  escrow: boolean; // true = FiveM Asset Escrow, false = open source
  badge?: "ขายดี" | "ใหม่" | "ลดราคา";
  icon: IconName;
  hue: number; // สีปก (0-360)
  image?: string; // ใส่ URL รูปปกจริงได้ (เช่น /images/mdt.webp)
  previewUrl?: string; // YouTube / Streamable
  docsUrl?: string;
}

export type IconName =
  | "tablet" | "garage" | "phone" | "gauge" | "car" | "house" | "hammer" | "fuel" | "monitor" | "siren";

export const CATEGORIES: Record<Category, string> = {
  job: "อาชีพ / Job",
  ui: "UI / HUD",
  vehicle: "ยานพาหนะ",
  housing: "บ้าน / อสังหา",
  utility: "ระบบเสริม",
};

export const FRAMEWORKS: Framework[] = ["ESX", "QBCore", "QBox", "Standalone"];

export const PRODUCTS: Product[] = [
  {
    id: "arp-mdt",
    name: "ARP Police MDT",
    tagline: "แท็บเล็ตตำรวจครบวงจร ค้นประวัติ ออกหมาย บันทึกคดี",
    description:
      "ระบบ MDT สำหรับหน่วยงานตำรวจ ค้นหาประชาชนและยานพาหนะ ออกใบสั่ง/หมายจับ บันทึกรายงานคดีพร้อมแนบรูป แดชบอร์ดเจ้าหน้าที่ที่ออนไลน์ และระบบ BOLO แบบเรียลไทม์ UI ลื่นไหล ปรับธีมสีตามหน่วยงานได้",
    category: "job",
    price: 1290,
    salePrice: 990,
    frameworks: ["ESX", "QBCore", "QBox"],
    features: [
      "ค้นหาประชาชน / ทะเบียนรถ / อาวุธ",
      "ออกใบสั่ง หมายจับ และบันทึกคดี",
      "ระบบ BOLO และ Dispatch เรียลไทม์",
      "แนบรูปหลักฐานผ่าน screenshot-basic",
      "รองรับหลายหน่วยงาน (LSPD, BCSO, SAST)",
      "ไฟล์ภาษาไทย / อังกฤษ",
    ],
    dependencies: ["oxmysql", "ox_lib", "screenshot-basic"],
    version: "2.3.0",
    updated: "2026-11-02",
    escrow: true,
    badge: "ขายดี",
    icon: "tablet",
    hue: 215,
  },
  {
    id: "arp-phone",
    name: "ARP Phone",
    tagline: "โทรศัพท์มือถือสไตล์สมาร์ทโฟนจริง พร้อมแอปกว่า 15 แอป",
    description:
      "โทรศัพท์ในเกมที่ออกแบบใหม่ทั้งหมด มีแอปแชท โซเชียล กล้อง ธนาคาร ตลาดซื้อขาย และโทรด้วยเสียงผ่าน pma-voice รองรับการแต่ง wallpaper/เคส และมี API สำหรับให้นักพัฒนาสร้างแอปเพิ่มเอง",
    category: "ui",
    price: 1990,
    frameworks: ["ESX", "QBCore", "QBox"],
    features: [
      "แอป 15+ (Messages, Social, Bank, Market, Camera ฯลฯ)",
      "โทรเสียง / วิดีโอคอลผ่าน pma-voice",
      "Custom App API สำหรับนักพัฒนา",
      "ระบบซิมการ์ดและเบอร์โทรเฉพาะตัว",
      "บันทึกรูปลงแกลเลอรี่ (รองรับ Fivemanage)",
    ],
    dependencies: ["oxmysql", "ox_lib", "pma-voice"],
    version: "1.8.2",
    updated: "2026-10-18",
    escrow: true,
    badge: "ใหม่",
    icon: "phone",
    hue: 265,
  },
  {
    id: "arp-garage",
    name: "ARP Advanced Garage",
    tagline: "การาจหลายจุด ระบบพาวด์ แชร์รถให้แก๊ง/บริษัท",
    description:
      "ระบบการาจที่ตั้งค่าได้ทุกจุดผ่าน config รองรับการาจส่วนตัว การาจแก๊ง การาจงาน และพาวด์ แสดงสภาพรถ น้ำมัน และระยะทางก่อนเบิก พร้อมพรีวิว 3D ของรถ",
    category: "vehicle",
    price: 590,
    frameworks: ["ESX", "QBCore", "QBox"],
    features: [
      "การาจส่วนตัว / แก๊ง / งาน / พาวด์",
      "พรีวิวรถแบบ 3D ก่อนเบิก",
      "บันทึกสภาพรถ, น้ำมัน, mods",
      "โอนรถระหว่างผู้เล่น",
    ],
    dependencies: ["oxmysql", "ox_lib"],
    version: "3.1.0",
    updated: "2026-09-27",
    escrow: true,
    icon: "garage",
    hue: 160,
  },
  {
    id: "arp-neon-hud",
    name: "ARP Neon HUD",
    tagline: "HUD มินิมอล แสดงสถานะ ความเร็ว เข็มทิศ ปรับได้ในเกม",
    description:
      "HUD สไตล์นีออนที่เบาเครื่อง (0.00ms ตอน idle) ผู้เล่นปรับตำแหน่ง สี และขนาดได้เองผ่านเมนูในเกม มีสปีดโอมิเตอร์ เข็มทิศ แสดงถนน และสถานะเสียงพูด",
    category: "ui",
    price: 290,
    frameworks: ["ESX", "QBCore", "QBox"],
    features: [
      "Resmon 0.00ms ตอน idle",
      "ผู้เล่นปรับแต่ง HUD ได้เอง",
      "สปีดโอมิเตอร์ + เข็มทิศ + ชื่อถนน",
      "แสดงสถานะ pma-voice",
    ],
    dependencies: ["ox_lib"],
    version: "1.4.1",
    updated: "2026-08-12",
    escrow: false,
    icon: "gauge",
    hue: 300,
  },
  {
    id: "arp-dealership",
    name: "ARP Vehicle Dealership",
    tagline: "โชว์รูมรถ ทดลองขับ ผ่อนชำระ และระบบพนักงานขาย",
    description:
      "โชว์รูมรถพร้อมกล้องหมุนรอบตัวรถ ทดลองขับแบบจำกัดเวลา ผ่อนชำระรายงวด และให้ผู้เล่นเป็นพนักงานขายรับค่าคอมมิชชันได้",
    category: "vehicle",
    price: 790,
    frameworks: ["ESX", "QBCore"],
    features: [
      "โชว์รูมพร้อมกล้อง 360°",
      "ทดลองขับจำกัดเวลา",
      "ระบบผ่อนชำระ + ยึดรถเมื่อค้างจ่าย",
      "อาชีพพนักงานขาย + ค่าคอม",
    ],
    dependencies: ["oxmysql", "ox_lib"],
    version: "2.0.4",
    updated: "2026-07-30",
    escrow: true,
    icon: "car",
    hue: 25,
  },
  {
    id: "arp-housing",
    name: "ARP Housing",
    tagline: "ซื้อ/เช่าบ้าน ตกแต่งเฟอร์นิเจอร์ แชร์กุญแจ",
    description:
      "ระบบบ้านที่รองรับทั้ง shell และ MLO ผู้เล่นซื้อหรือเช่าบ้าน วางเฟอร์นิเจอร์แบบ gizmo แชร์กุญแจให้เพื่อน มีตู้เก็บของ ตู้เสื้อผ้า และระบบนายหน้าอสังหา",
    category: "housing",
    price: 1490,
    frameworks: ["ESX", "QBCore", "QBox"],
    features: [
      "รองรับ Shell และ MLO",
      "วางเฟอร์นิเจอร์แบบ gizmo",
      "แชร์กุญแจ / ล็อกประตู",
      "อาชีพนายหน้าอสังหา",
      "ตู้เก็บของผ่าน ox_inventory",
    ],
    dependencies: ["oxmysql", "ox_lib", "ox_inventory"],
    version: "1.2.0",
    updated: "2026-10-05",
    escrow: true,
    icon: "house",
    hue: 45,
  },
  {
    id: "arp-crafting",
    name: "ARP Crafting Bench",
    tagline: "โต๊ะคราฟต์พร้อมระบบเลเวลและสูตรลับ",
    description:
      "ระบบคราฟต์ที่ตั้งสูตรได้ไม่จำกัด มีเลเวลผู้คราฟต์ เปอร์เซ็นต์สำเร็จ สูตรลับที่ต้องปลดล็อก และจำกัดโต๊ะตามงาน/แก๊ง",
    category: "utility",
    price: 390,
    frameworks: ["ESX", "QBCore", "QBox"],
    features: [
      "สูตรไม่จำกัด ตั้งค่าใน config",
      "ระบบเลเวล + XP",
      "สูตรลับ / blueprint",
      "จำกัดโต๊ะตาม job / gang",
    ],
    dependencies: ["ox_lib", "ox_inventory"],
    version: "1.6.0",
    updated: "2026-06-21",
    escrow: false,
    icon: "hammer",
    hue: 0,
  },
  {
    id: "arp-fuel",
    name: "ARP Fuel & EV",
    tagline: "ระบบน้ำมันและสถานีชาร์จรถไฟฟ้า",
    description:
      "ระบบน้ำมันที่สมจริง หัวจ่ายแยกชนิดน้ำมัน สถานีชาร์จ EV แกลลอนน้ำมัน และให้ผู้เล่นเป็นเจ้าของปั๊มได้",
    category: "utility",
    price: 250,
    frameworks: ["ESX", "QBCore", "QBox", "Standalone"],
    features: [
      "แยกชนิดน้ำมัน + EV",
      "ถือหัวจ่ายแบบมี rope",
      "แกลลอนน้ำมัน",
      "เจ้าของปั๊ม + สต็อกน้ำมัน",
    ],
    dependencies: ["ox_lib"],
    version: "2.2.3",
    updated: "2026-05-14",
    escrow: false,
    badge: "ลดราคา",
    salePrice: 199,
    icon: "fuel",
    hue: 120,
  },
  {
    id: "arp-loading",
    name: "ARP Loading Screen",
    tagline: "หน้าโหลดเซิร์ฟพร้อมเพลง ข่าว และทีมงาน",
    description:
      "หน้าโหลดที่แก้ไขได้ผ่านไฟล์ config ไฟล์เดียว รองรับวิดีโอพื้นหลัง เพลย์ลิสต์เพลง ประกาศข่าว รายชื่อทีมงาน และแถบโหลดตามสถานะจริง",
    category: "ui",
    price: 190,
    frameworks: ["Standalone"],
    features: [
      "วิดีโอ / รูปพื้นหลัง",
      "เพลย์ลิสต์เพลง",
      "ประกาศข่าว + รายชื่อทีมงาน",
      "Progress ตามการโหลดจริง",
    ],
    dependencies: [],
    version: "1.1.0",
    updated: "2026-04-02",
    escrow: false,
    icon: "monitor",
    hue: 190,
  },
  {
    id: "arp-ambulance",
    name: "ARP Ambulance Job",
    tagline: "ระบบหมอ บาดเจ็บรายจุด ชุบชีวิต และ Dispatch",
    description:
      "อาชีพหมอที่มีระบบบาดเจ็บตามอวัยวะ เลือดออก กระดูกหัก เตียงโรงพยาบาล และเครื่องมือแพทย์ครบชุด เชื่อมกับ MDT และ Dispatch ได้ทันที",
    category: "job",
    price: 690,
    frameworks: ["ESX", "QBCore", "QBox"],
    features: [
      "บาดเจ็บรายอวัยวะ + เลือดออก",
      "อุปกรณ์แพทย์ครบชุด",
      "เตียงโรงพยาบาล + เช็คอิน",
      "เชื่อมกับ ARP Police MDT",
    ],
    dependencies: ["oxmysql", "ox_lib"],
    version: "1.3.5",
    updated: "2026-09-09",
    escrow: true,
    badge: "ใหม่",
    icon: "siren",
    hue: 345,
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function finalPrice(p: Product): number {
  return p.salePrice ?? p.price;
}
