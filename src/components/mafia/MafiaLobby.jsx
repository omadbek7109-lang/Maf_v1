import { useState } from "react";
import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";

export default function MafiaLobby({ onStartGame }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Siz", isHost: true, isReady: true },
  ]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [botCount, setBotCount] = useState(1);

  const botNames = ["Sardor", "Aziza", "Bekzod", "Diyor", "Malika", "Jasur", "Olim", "Zilola"];

  // Sun'iy o'yinchi qo'shish
  const addPlayer = () => {
    if (players.length >= 20) return; // Maksimal 20 kishi
    const randomName = botNames[Math.floor(Math.random() * botNames.length)] + "_" + botCount;
    setPlayers([...players, { id: Date.now(), name: randomName, isHost: false, isReady: true }]);
    setBotCount(botCount + 1);
  };

  return (
    <div className="min-h-screen bg-bg p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-bg to-bg -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-strong rounded-3xl p-6 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Xona: <span className="text-purple-500">M4821</span></h1>
          <p className="text-gray-400 text-sm">O'yinchilar: {players.length} / 20</p>
        </div>

        {/* O'yinchilar ro'yxati */}
        <div className="space-y-2 mb-6 max-h-[300px] overflow-y-auto pr-2">
          {players.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xl">{p.isHost ? "👑" : "👤"}</span>
                <span className="text-white text-sm font-medium">{p.name}</span>
              </div>
              <span className={`text-xs ${p.isReady ? "text-green-500" : "text-gray-500"}`}>{p.isReady ? "Tayyor" : "Kutilmoqda"}</span>
            </motion.div>
          ))}
        </div>

        {/* Test uchun bot qo'shish */}
        <div className="flex gap-2 mb-6">
          <button onClick={addPlayer} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm transition border border-white/10">
            + Sun'iy o'yinchi qo'shish
          </button>
        </div>

        <NeonButton 
          onClick={() => onStartGame(players)} 
          className="w-full py-3 text-lg shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-500/50"
          disabled={players.length < 3}
        >
          O'yinni Boshlash
        </NeonButton>
        {players.length < 3 && <p className="text-center text-xs text-red-400 mt-2">Kamida 3 kishi kerak</p>}
      </motion.div>
    </div>
  );
}    
