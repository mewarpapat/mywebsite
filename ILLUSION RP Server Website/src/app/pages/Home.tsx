import { motion } from "motion/react";
import { Link } from "react-router";
import { Users, Server, Zap, Shield, Car, Briefcase, Skull, Flame, ChevronRight } from "lucide-react";
import { ServerStatus } from "../components/ServerStatus";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1620983626305-88db754c9a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0fGVufDF8fHx8MTc3NzUzODExNHww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Neon City Night" 
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
            Season 1 is now live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 mb-6 drop-shadow-2xl uppercase"
          >
            Welcome to <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">Illusion RP</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light"
          >
            เปิดประสบการณ์ Roleplay รูปแบบใหม่ สังคมคุณภาพ ระบบลื่นไหล พร้อมทีมงานดูแล 24 ชั่วโมง
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/whitelist" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold text-lg hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              เข้าเล่นตอนนี้ (Play Now)
            </Link>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-bold text-lg hover:bg-zinc-800 hover:border-white/20 transition-all flex items-center justify-center gap-2">
              <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" className="w-6 h-6" alt="Discord" />
              Join Discord
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <ServerStatus />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-zinc-950 border-y border-white/5 relative z-20 -mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Users className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-4xl font-black text-white mb-1">128<span className="text-zinc-500 text-2xl">/256</span></h3>
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Players Online</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Server className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-4xl font-black text-white mb-1">99.9<span className="text-zinc-500 text-2xl">%</span></h3>
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Server Uptime</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Zap className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className="text-4xl font-black text-white mb-1">5<span className="text-zinc-500 text-2xl">ms</span></h3>
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Avg. Ping (TH)</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Shield className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-4xl font-black text-white mb-1">24<span className="text-zinc-500 text-2xl">/7</span></h3>
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Active Staff</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-950 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">ระบบที่โดดเด่นของเรา</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              พบกับระบบที่ถูกพัฒนาขึ้นมาเพื่อความสมจริง เล่นสนุก และตอบโจทย์ผู้เล่นทุกสาย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1668037069509-ba4c569475b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjBuaWdodHxlbnwxfHx8fDE3Nzc2MzAxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Custom Cars" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                <Car className="absolute bottom-4 left-4 w-8 h-8 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">รถแต่ง Custom แบบจัดเต็ม</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  รวบรวมรถหลากหลายแบรนด์ ทั้ง JDM, Supercar, และรถคลาสสิค พร้อมระบบจูนนิ่ง ปรับแต่งสมรรถนะแบบละเอียด
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1590796330611-aa4c32f03601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpY2UlMjBsaWdodHMlMjBuaWdodHxlbnwxfHx8fDE3Nzc2MzAxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="LSPD" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                <Shield className="absolute bottom-4 left-4 w-8 h-8 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">ระบบตำรวจเสมือนจริง</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  สวมบทบาทเป็น LSPD พร้อมระบบ MDT ที่ทันสมัย อาวุธครบมือ และภารกิจปราบปรามอาชญากรรมสุดท้าทาย
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden hover:border-pink-500/30 transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1760273054958-97f1bd751081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBnYW5nJTIwdXJiYW4lMjBuaWdodHxlbnwxfHx8fDE3Nzc2MzAxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Gangs" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                <Skull className="absolute bottom-4 left-4 w-8 h-8 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">ระบบแก๊ง & ยึดพื้นที่</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  สร้างอิทธิพล รวบรวมคนในแก๊ง ต่อสู้เพื่อแย่งชิงพื้นที่ (Turf War) และทำธุรกิจสีเทาเพื่อความยิ่งใหญ่
                </p>
              </div>
            </div>

            {/* Additional Features (Cards only) */}
            <div className="rounded-2xl bg-zinc-900/30 border border-white/5 p-6 hover:bg-zinc-900/80 transition-colors">
              <Briefcase className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">อาชีพที่หลากหลาย</h3>
              <p className="text-zinc-400 text-sm">มีทั้งอาชีพสุจริต หมอ ช่าง และอื่นๆ อีกมากมาย ให้คุณหาเงินในแบบที่คุณชอบ</p>
            </div>
            
            <div className="rounded-2xl bg-zinc-900/30 border border-white/5 p-6 hover:bg-zinc-900/80 transition-colors">
              <Flame className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">กิจกรรมรายวัน</h3>
              <p className="text-zinc-400 text-sm">Event พิเศษ แจกของรางวัล ทั้งแข่งรถ แอร์ดรอป และมินิเกมต่างๆ ไม่น่าเบื่อแน่นอน</p>
            </div>
            
            <div className="rounded-2xl bg-zinc-900/30 border border-white/5 p-6 hover:bg-zinc-900/80 transition-colors">
              <Zap className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">เซิร์ฟเวอร์เสถียร FPS สูง</h3>
              <p className="text-zinc-400 text-sm">สคริปต์ปรับแต่งพิเศษ (Optimized) กินทรัพยากรน้อย เล่นลื่น ไม่หน่วง ภาพสวยจัดเต็ม</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-zinc-950 to-zinc-950"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">พร้อมที่จะเริ่มชีวิตใหม่หรือยัง?</h2>
          <p className="text-xl text-zinc-300 mb-10 font-light">
            เข้าร่วมคอมมูนิตี้ของเราวันนี้ อ่านกฎระเบียบ สมัครสอบ Whitelist <br className="hidden md:block"/>และเข้ามาเป็นส่วนหนึ่งของครอบครัว ILLUSION RP
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/whitelist" className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-lg hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all">
              สอบ Whitelist
            </Link>
            <Link to="/rules" className="px-8 py-4 rounded-xl bg-zinc-800 text-white font-bold text-lg hover:bg-zinc-700 transition-all border border-white/10 hover:border-white/20">
              อ่านกฎหมายเมือง
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
