import { motion } from "motion/react";
import { Calendar, Tag, ChevronRight, Newspaper } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Update Patch Notes v1.2 - New Heist & Jobs",
    category: "Update",
    date: "May 1, 2026",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cHxlbnwxfHx8fDE3Nzc2MzAxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt: "ระบบปล้นธนาคารใหม่ล่าสุด พร้อมอาชีพใหม่สำหรับสายขาวและสายดำ..."
  },
  {
    id: 2,
    title: "กิจกรรม Illusion Racing Championship Season 1",
    category: "Event",
    date: "April 28, 2026",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXJ8ZW58MXx8fHwxNzc3NjMwMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt: "ชิงรางวัลเงินสดและรถ Limited Edition ประจำซีซั่น สมัครได้แล้ววันนี้!"
  },
  {
    id: 3,
    title: "เปิดรับสมัครทีมงาน Staff & Support",
    category: "Announcement",
    date: "April 25, 2026",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3xlbnwxfHx8fDE3Nzc2MzAxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt: "ร่วมเป็นส่วนหนึ่งของการดูแลเมือง ILLUSION ให้ดียิ่งขึ้นไปกับเรา"
  }
];

export function News() {
  return (
    <div className="pt-24 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
            <Newspaper className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">News & Announcements</h1>
            <p className="text-zinc-400">ติดตามข่าวสารและการอัปเดตล่าสุดจากเมือง ILLUSION</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-purple-500/30 transition-all hover:bg-zinc-900/60"
              >
                <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-zinc-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all">
                    อ่านเพิ่มเติม <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-500" />
                หมวดหมู่
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Update", "Event", "Announcement", "Community", "Patch Notes"].map(tag => (
                  <button key={tag} className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-medium hover:bg-purple-600 hover:text-white transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">เข้ากลุ่ม Discord</h3>
                <p className="text-white/80 text-sm mb-6">พูดคุย แจ้งปัญหา และรับข่าวสารแบบ Real-time ได้ใน Discord ของเรา</p>
                <button className="w-full py-3 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-100 transition-all flex items-center justify-center gap-2">
                  <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" className="w-5 h-5 brightness-0" alt="Discord" />
                  Join Our Discord
                </button>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
