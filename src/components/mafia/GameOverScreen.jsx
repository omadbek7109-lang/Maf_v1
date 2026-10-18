import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, RefreshCw, Skull, Shield, Eye, Crown, User } from "lucide-react";

// Konfetti effekti uchun kichik komponent
const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`, 
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            top: "110%", 
            rotate: Math.random() * 360,
            opacity: 0
          }}
          transition={{ 
            duration: Math.random() * 2 + 1.5, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className={`absolute w-2 h-2 rounded-sm ${
            ["bg-purple-500", "bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-green-500"][Math.floor(Math.random() * 5)]
          }`}
        />
      ))}
    </div>
  );
};

export default function GameOverScreen({ winner, players, allRoles, onPlayAgain }) {
  const [showRoles, setShowRoles] = useState(false);

  // 2 soniyadan keyin rollarni ochish
  useEffect(() => {
    const timer = setTimeout(() => setShowRoles(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const isMafiaWin = winner === "mafia";
  const winColor = isMafiaWin ? "text-red-500" : "text-green-500";
  const winGlow = isMafiaWin ? "shadow-[0_0_80px_rgba(239,68,68,0.4)]" : "shadow-[0_0_80px_rgba(16,185,129,0.4)]";

  const roleIcons = {
    mafia: <Skull size={14} className="text-red-500" />,
    don: <Crown size={14} className="text-red-600" />,
    doctor: <Shield size={14} className="text-green-500" />,
    detective: <Eye size={14} className="text-blue-500" />,
    citizen: <User size={14} className="text-purple-400" />,
  };

  const roleNames = {
    mafia: "Mafia", don: "Don", doctor: "Shifokor", detective: "Komissar", citizen: "Tinch aholi"
  };

  return (
    <div className={`min-h-screen bg-[#050508] flex flex-col items-center justify-center p-4 relative overflow-hidden ${winGlow}`}>
      <Confetti />
      
      {/* G'olib e'lon qilinishi */}
      <motion.div 
        initial={{ scale: 0, rotate: -180 }} 
        animate={{ scale: 1, rotate: 0 }} 
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="z-10 text-center mb-8"
      >
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 border-2 ${isMafiaWin ? 'bg-red-500/10 border-red-500' : 'bg-green-500/10 border-green-500'}`}>
          <Trophy size={48} className={winColor} />
        </div>
        <h1 className={`text-4xl md:text-5xl font-display font-bold ${winColor} drop-shadow-[0_0_20px_currentColor] mb-2 uppercase tracking-widest`}>
          {isMafiaWin ? "MAFIA YUTDI" : "TINCH AHOLI YUTDI"}
        </h1>
        <p className="text-gray-400 text-sm">O'yin yakunlandi. Barcha rollar ochiladi.</p>
      </motion.div>

      {/* Rollarni ochish */}
      {showRoles && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-strong rounded-2xl p-4 border border-white/10 z-10 mb-6"
        >
          <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3 text-center">O'yinchilar va Rollar</h3>
          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
            {players.map((p, i) => {
              const role = allRoles[i] || "citizen";
              const isMafiaTeam = role === "mafia" || role === "don";
              return (
                <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl border ${isMafiaTeam ? 'bg-red-500/5 border-red-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">👤</span>
                    <span className="text-white text-xs">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg">
                    {roleIcons[role]}
                    <span className={`text-[10px] font-bold ${isMafiaTeam ? 'text-red-400' : 'text-green-400'}`}>{roleNames[role]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Qaytadan o'ynash */}
      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={onPlayAgain}
        className="z-10 flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold text-sm transition"
      >
        <RefreshCw size={16} /> Qaytadan o'ynash
      </motion.button>
    </div>
  );
}
