import { useState } from "react";
import { motion } from "framer-motion";

const roles = {
  mafia: { name: "MAFIA", icon: "🔫", color: "#EF4444", desc: "Sizning vazifangiz: Kechasi tinch aholini o'ldirish." },
  doctor: { name: "DOKTOR", icon: "🩺", color: "#10B981", desc: "Sizning vazifangiz: Kechasi bitta odamni qutqarish." },
  detective: { name: "KOMISSAR", icon: "👮", color: "#3B82F6", desc: "Sizning vazifangiz: Kechasi bitta odamning rolini tekshirish." },
  citizen: { name: "TINCH AHOLI", icon: "👨‍🌾", color: "#A855F7", desc: "Sizning vazifangiz: Kunduzi mafiyani topib, ovoz berish." },
};

export default function RoleCard({ role, onClose }) {
  const [flipped, setFlipped] = useState(false);
  const roleData = roles[role] || roles.citizen;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 perspective-1000">
      <motion.div
        className="relative w-full max-w-sm h-[500px] cursor-pointer preserve-3d"
        onClick={() => setFlipped(true)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
      >
        {/* Karta orqa tomoni (Yopiq) */}
        <div className="absolute inset-0 backface-hidden glass-strong rounded-3xl border-2 border-red-900/50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)]">
          <div className="text-8xl mb-6 opacity-30 animate-pulse">?</div>
          <p className="text-gray-400 tracking-widest uppercase text-sm">Rolingizni ko'rish uchun bosing</p>
        </div>

        {/* Karta old tomoni (Ochiq) */}
        <div 
          className="absolute inset-0 backface-hidden glass-strong rounded-3xl border-2 flex flex-col items-center justify-center p-8 text-center shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          style={{ transform: "rotateY(180deg)", borderColor: roleData.color, boxShadow: `0 0 50px ${roleData.color}40` }}
        >
          <div className="text-7xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{roleData.icon}</div>
          <h2 className="text-4xl font-display font-bold mb-4 tracking-widest" style={{ color: roleData.color }}>
            {roleData.name}
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            {roleData.desc}
          </p>
          <div className="mt-10 w-full">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10"
            >
              Tushundim
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
