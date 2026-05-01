import { Link } from "react-router";
import { Gamepad2, Twitter, Facebook, Instagram, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                ILLUSION <span className="text-purple-500">RP</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              เซิร์ฟเวอร์ FiveM Roleplay ที่มุ่งเน้นประสบการณ์การเล่นที่สมจริง 
              สังคมที่ดี และระบบที่ทันสมัยที่สุดในไทย มาร่วมสร้างตำนานของคุณที่นี่
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#5865F2] transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">เมนูหลัก</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">หน้าแรก</Link></li>
              <li><Link to="/news" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">ข่าวสาร & กิจกรรม</Link></li>
              <li><Link to="/rules" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">กฎระเบียบเซิร์ฟเวอร์</Link></li>
              <li><Link to="/whitelist" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">สมัคร Whitelist</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">ช่วยเหลือ</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">วิธีติดตั้งเกม</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">แจ้งปัญหา / แบน</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-purple-400 text-sm transition-colors">ติดต่อทีมงาน</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} ILLUSION RP. All rights reserved. Not affiliated with Rockstar Games or Take-Two Interactive.
          </p>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-zinc-400 text-sm">Server Status: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
