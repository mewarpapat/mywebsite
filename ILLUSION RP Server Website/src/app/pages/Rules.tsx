import { motion } from "motion/react";
import { ShieldAlert, Scale, Gavel, AlertTriangle, Info } from "lucide-react";

export function Rules() {
  const rules = [
    {
      title: "กฎพื้นฐาน (General Rules)",
      icon: <Scale className="w-6 h-6" />,
      items: [
        "ห้ามกระทำการใดๆ ที่เป็นการโกงโปรแกรมช่วยเล่น (Cheat/Script/Hack)",
        "ห้ามทำการ Toxic หรือด่าทอบุคคลอื่นด้วยความรุนแรงนอกบทบาท (OOC)",
        "ห้ามกระทำการโฆษณาเซิร์ฟเวอร์อื่นภายในเซิร์ฟเวอร์และ Discord",
        "ห้ามทำการ RDM (Random Deathmatch) คือการฆ่าผู้อื่นโดยไม่มีเหตุผลทาง Roleplay",
        "ห้ามทำการ VDM (Vehicle Deathmatch) คือการใช้รถชนผู้อื่นโดยไม่มีเหตุผล"
      ]
    },
    {
      title: "การเล่นตามบทบาท (Roleplay Rules)",
      icon: <Gavel className="w-6 h-6" />,
      items: [
        "ห้ามทำการ Fail RP เช่น การพูดเรื่องนอกเกมในเมือง",
        "ห้ามทำการ Metagaming (MG) คือการนำข้อมูลนอกเกมมาใช้ในเกม",
        "ห้ามทำการ Powergaming (PG) คือการทำสิ่งที่ในชีวิตจริงทำไม่ได้",
        "ห้ามทำการ Fear RP คือการไม่เกรงกลัวต่ออันตรายที่เกิดขึ้นต่อหน้า",
        "การโดนจับกุมหรือปล้น ต้องให้ความร่วมมือตามสถานการณ์ Roleplay"
      ]
    },
    {
      title: "กฎสำหรับหน่วยงาน (Whitelist Rules)",
      icon: <ShieldAlert className="w-6 h-6" />,
      items: [
        "หน่วยงานตำรวจและหมอต้องปฏิบัติหน้าที่อย่างเคร่งครัด",
        "ห้ามนำอุปกรณ์หน่วยงานไปใช้ในทางที่ผิดหรือส่งต่อให้บุคคลภายนอก",
        "การทุจริตในหน้าที่ (Corruption) ต้องมีการขออนุญาตจากทีมงานก่อนเสมอ",
        "ต้องให้เกียรติเพื่อนร่วมงานและประชาชนในบทบาทอย่างเหมาะสม"
      ]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Rules & <span className="text-purple-500">Regulations</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            โปรดอ่านและทำความเข้าใจกฎระเบียบของเมืองเพื่อสังคมการเล่นที่ดีและมีคุณภาพสำหรับทุกคน
          </p>
        </motion.div>

        <div className="grid gap-8">
          {rules.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                {section.icon}
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-4 text-zinc-300">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex gap-6 items-center"
        >
          <div className="p-4 rounded-2xl bg-orange-500/20 text-orange-400 shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-orange-400 mb-1 flex items-center gap-2">
              คำเตือน
            </h3>
            <p className="text-zinc-400 text-sm">
              การฝ่าฝืนกฎระเบียบอาจส่งผลให้ถูกลงโทษตั้งแต่การเตือน, การแบนชั่วคราว ไปจนถึงการแบนถาวรโดยไม่ต้องแจ้งให้ทราบล่วงหน้า ขึ้นอยู่กับดุลยพินิจของทีมงาน
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 flex flex-col justify-between">
              <div>
                <Info className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">ยังไม่เข้าใจกฎบางข้อ?</h3>
                <p className="text-zinc-400 text-sm mb-6">คุณสามารถสอบถามรายละเอียดเพิ่มเติมได้ผ่านทางห้อง Support ใน Discord ของเรา</p>
              </div>
              <button className="w-full py-4 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-all">
                สอบถามทีมงาน
              </button>
           </div>
           <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex flex-col justify-between">
              <div>
                <ShieldAlert className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">เข้าใจกฎแล้ว?</h3>
                <p className="text-white/80 text-sm mb-6">ถ้าคุณพร้อมแล้ว ก็สามารถไปสมัคร Whitelist เพื่อเข้าเล่นในเมืองได้เลย!</p>
              </div>
              <button className="w-full py-4 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-100 transition-all">
                ไปสมัคร Whitelist
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
