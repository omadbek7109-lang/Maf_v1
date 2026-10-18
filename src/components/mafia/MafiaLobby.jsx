import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Crown, User, Play } from "lucide-react";
import NeonButton from "../ui/NeonButton";

export default function MafiaLobby({ onStartGame }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Siz (Xona egasi)", isHost: true, isReady: true },
  ]);
  const [isCopied, setIsCopied] = useState(false);
  const [botCount, setBotCount] = useState(1);

  // Xona kodi (Hozircha qat'iy, server ulanganda dinamik bo'ladi)
  const roomCode = "M4821";
  const maxPlayers = 20;

  const botNames = ["Sardor", "Aziza", "Bekzod", "Diyor", "Malika", "Jasur", "Olim", "Zilola", "Rustam", "Gulnora"];

  // Kodni nusxalash
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Sun'iy o'yinchi qo'shish
  const addPlayer = () => {
    if (players.length >= maxPlayers) return;
    const randomName = botNames[Math.floor(Math.random() * botNames.length)] + "_" + botCount;
    setPlayers([...players, { id: Date.now(), name: randomName, isHost: false, isReady: true }]);
    setBotCount(botCount + 1);
  };

  return (
    <div className="min-h-screen bg-[#050508] p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fon effektlari */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#050508] to-[#050508] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-strong rounded-3xl p-5 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] z-10"
      >
        {/* Sarlavha va Xona Kodi */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-display font-bold text-white mb-2">Kutish Xonasi</h1>
          
          <div 
            onClick={copyToClipboard}
            className="inline-flex items-center gap-2 bg-black/50 border border-purple-500/30 px-4 py-2 rounded-xl cursor-pointer hover:bg-black/70 transition group"
          >
            <span className="text-sm text-gray-400">Kod:</span>
            <span className="text-lg font-mono font-bold text-purple-400 tracking-widest">{roomCode}</span>
            {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500 group-hover:text-purple-400 transition" />}
          </div>
          
          <p className="text-gray-400 text-[11px] mt-3">
            O'yinchilar: <span className="text-white font-bold">{players.length}</span> / {maxPlayers}
          </p>
        </div>

        {/* O'yinchilar Ro'yxati */}
        <div className="space-y-2 mb-6 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
          <AnimatePresence>
            {players.map((p) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${p.isHost ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-purple-900/50 text-purple-300 border border-purple-500/30'}`}>
                    {p.isHost ? <Crown size={14} /> : <User size={14} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-xs font-medium">{p.name}</span>
                    {p.isHost && <span className="text-[9px] text-yellow-500">Xona egasi</span>}
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-md ${p.isReady ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}>
                  {p.isReady ? "Tayyor" : "Kutilmoqda"}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Test uchun bot qo'shish */}
        <div className="mb-6">
          <button 
            onClick={addPlayer} 
            className="w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-300 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            + Sun'iy o'yinchi qo'shish
          </button>
        </div>

        {/* O'yinni boshlash tugmasi */}
        <NeonButton 
          onClick={() => onStartGame(players)} 
          className="w-full py-3.5 text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/50 flex items-center justify-center gap-2"
          disabled={players.length < 3}
        >
          <Play size={16} /> O'yinni Boshlash
        </NeonButton>
        
        {players.length < 3 && (
          <p className="text-center text-[10px] text-red-400 mt-2">O'yinni boshlash uchun kamida 3 kishi kerak</p>
        )}
      </motion.div>
    </div>
  );
} 
