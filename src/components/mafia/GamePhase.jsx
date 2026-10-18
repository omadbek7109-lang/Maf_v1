import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Shield, Eye, Crosshair } from "lucide-react";

export default function GamePhase({ myRole, players, onFinish }) {
  const [phase, setPhase] = useState("night"); // night | day
  const [timeLeft, setTimeLeft] = useState(15); // 15 soniya taymer

  // Ovoz effektlarini chalish funksiyasi
  const playSound = (type) => {
    // Brauzer orqali oddiy ovozlar (Keyinchalik fayl qo'shsa bo'ladi)
    const audio = new Audio(
      type === "click" 
        ? "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" 
        : "https://assets.mixkit.co/active_storage/sfx/123/123-preview.mp3"
    );
    audio.volume = 0.5;
    audio.play().catch(() => {}); // Xato bersa jim o'tadi
  };

  // Taymer mantiqi
  useEffect(() => {
    if (timeLeft <= 0) {
      if (phase === "night") {
        setPhase("day");
        setTimeLeft(20); // Kunduzgi muhokama uchun 20 soniya
      } else {
        onFinish(); // O'yin tugadi (keyingi bosqichga o'tish)
      }
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, phase, onFinish]);

  // Rolga qarab harakatlar
  const renderAction = () => {
    if (phase === "day") {
      return (
        <div className="text-center">
          <h3 className="text-2xl text-yellow-400 mb-4">Muhokama vaqti!</h3>
          <p className="text-gray-300">Kim Mafia bo'lishi mumkin?</p>
          <div className="grid grid-cols-2 gap-4 mt-8">
             {players.map((p, i) => (
               <button 
                 key={i} 
                 onClick={() => playSound("click")}
                 className="glass p-3 rounded-xl hover:bg-red-500/20 border border-white/10 transition"
               >
                 {p.name}
               </button>
             ))}
          </div>
        </div>
      );
    }

    // Kechasi
    switch (myRole) {
      case "mafia":
        return (
          <div className="text-center">
            <h3 className="text-2xl text-red-500 mb-4 flex items-center justify-center gap-2"><Crosshair /> Qurbonni tanlang</h3>
            <div className="grid grid-cols-2 gap-4">
              {players.map((p, i) => (
                <button key={i} onClick={() => playSound("click")} className="glass p-3 rounded-xl hover:bg-red-500/30 border border-red-500/30 transition text-white">
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        );
      case "doctor":
        return (
          <div className="text-center">
            <h3 className="text-2xl text-green-500 mb-4 flex items-center justify-center gap-2"><Shield /> Kimni himoya qilasiz?</h3>
            <div className="grid grid-cols-2 gap-4">
              {players.map((p, i) => (
                <button key={i} onClick={() => playSound("click")} className="glass p-3 rounded-xl hover:bg-green-500/30 border border-green-500/30 transition text-white">
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        );
      case "detective":
        return (
          <div className="text-center">
            <h3 className="text-2xl text-blue-500 mb-4 flex items-center justify-center gap-2"><Eye /> Kimni tekshirasiz?</h3>
            <div className="grid grid-cols-2 gap-4">
              {players.map((p, i) => (
                <button key={i} onClick={() => playSound("click")} className="glass p-3 rounded-xl hover:bg-blue-500/30 border border-blue-500/30 transition text-white">
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h3 className="text-xl text-gray-400">Siz tinch aholisiz. Kuting...</h3>
            <div className="mt-8 animate-pulse text-6xl">💤</div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 transition-colors duration-1000 ${phase === "night" ? "bg-[#050510]" : "bg-gradient-to-b from-blue-900 to-orange-900"}`}>
      
      {/* Kecha/Kunduz 3D Effektlari */}
      <AnimatePresence>
        {phase === "night" ? (
          <motion.div 
            key="night"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-20 pointer-events-none"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-8xl opacity-80 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">🌙</motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="day"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-20 pointer-events-none"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="text-8xl opacity-80 drop-shadow-[0_0_50px_rgba(255,165,0,0.8)]">☀️</motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asosiy Panel */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md glass-strong rounded-3xl p-8 border border-white/10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            {phase === "night" ? <Moon className="text-blue-400" /> : <Sun className="text-yellow-400" />}
            <h2 className="text-xl font-bold uppercase tracking-widest text-white">
              {phase === "night" ? "Kecha" : "Kunduz"}
            </h2>
          </div>
          <div className="text-2xl font-mono font-bold text-red-500 animate-pulse">
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </div>
        </div>

        {renderAction()}
      </motion.div>
    </div>
  );
            }
