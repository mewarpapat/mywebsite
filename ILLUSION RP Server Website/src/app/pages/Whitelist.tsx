import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { User, ClipboardCheck, MessageSquare, Send, ShieldCheck, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface WhitelistForm {
  playerName: string;
  age: number;
  steamName: string;
  discordTag: string;
  characterConcept: string;
  whyJoin: string;
}

export function Whitelist() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WhitelistForm>();

  const onSubmit = (data: WhitelistForm) => {
    console.log(data);
    toast.success("ส่งใบสมัครเรียบร้อยแล้ว! โปรดรอการตรวจสอบจากทีมงานใน Discord");
    reset();
  };

  return (
    <div className="pt-24 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Info Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
                Join the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Community</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                การสมัคร Whitelist เป็นขั้นตอนสำคัญในการคัดกรองผู้เล่นคุณภาพเข้าสู่เมือง ILLUSION RP 
                เพื่อรักษาบรรยากาศการเล่นที่สมจริงและสนุกสนานสำหรับทุกคน
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">ผู้เล่นคุณภาพ</h3>
                    <p className="text-sm text-zinc-500">เราเน้นการคัดกรองผู้ที่มีความเข้าใจใน Roleplay อย่างแท้จริง</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">สัมภาษณ์ผ่าน Discord</h3>
                    <p className="text-sm text-zinc-500">หลังจากส่งใบสมัคร จะมีขั้นตอนการสัมภาษณ์เสียงใน Discord</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">ต้องการความช่วยเหลือ?</h3>
                    <p className="text-sm text-zinc-500">หากติดปัญหาในการกรอกข้อมูล สามารถสอบถามได้ตลอด 24 ชม.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-10 rounded-[2rem] bg-zinc-900/30 border border-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
                <ClipboardCheck className="w-8 h-8 text-purple-500" />
                <h2 className="text-2xl font-bold text-white">Whitelist Application Form</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2 px-1">
                      <User className="w-4 h-4" /> ชื่อ-นามสกุล (เล่น)
                    </label>
                    <input 
                      {...register("playerName", { required: true })}
                      placeholder="เช่น สมชาย ใจดี"
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                    {errors.playerName && <span className="text-xs text-red-500 px-1">กรุณากรอกชื่อของคุณ</span>}
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2 px-1">
                      อายุ
                    </label>
                    <input 
                      type="number"
                      {...register("age", { required: true, min: 15 })}
                      placeholder="ขั้นต่ำ 15 ปี"
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                    {errors.age && <span className="text-xs text-red-500 px-1">อายุต้อง 15 ปีขึ้นไป</span>}
                  </div>

                  {/* Steam */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2 px-1">
                      Steam Profile Name
                    </label>
                    <input 
                      {...register("steamName", { required: true })}
                      placeholder="ระบุชื่อใน Steam"
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  {/* Discord */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2 px-1">
                      Discord ID
                    </label>
                    <input 
                      {...register("discordTag", { required: true })}
                      placeholder="เช่น illusion#0001"
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                {/* Character Concept */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2 px-1">
                    Character Concept (เล่าประวัติตัวละครย่อๆ)
                  </label>
                  <textarea 
                    {...register("characterConcept", { required: true })}
                    rows={4}
                    placeholder="ตัวละครของคุณเป็นใคร มีเป้าหมายอะไรในเมืองนี้..."
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  />
                </div >

                {/* Why Join */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2 px-1">
                    ทำไมถึงอยากร่วมเป็นส่วนหนึ่งของ ILLUSION RP?
                  </label>
                  <textarea 
                    {...register("whyJoin", { required: true })}
                    rows={4}
                    placeholder="บอกเหตุผลที่ทำให้คุณเลือกเซ���ร์ฟเวอร์เรา..."
                    className="w-full px-5 py-4 rounded-2xl bg-zinc-950 border border-white/10 text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  ส่งใบสมัครเข้าร่วมเมือง
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
