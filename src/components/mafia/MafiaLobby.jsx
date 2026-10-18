import { useState } from "react";
import { motion } from "framer-motion";
import NeonButton from "../ui/NeonButton";

export default function MafiaLobby({ onStartGame }) {
  const [players, setPlayers] = useState([
    { id: 1, name: "Siz (Xona egasi)", isHost: true, isReady: true },
  ]);
  const [newPlayerName, setNewPlayerName] = useState("");

  // Sun'iy o'yinchi qo'shish (Hozircha offline test uchun)
  const addPlayer = () => {
    if (!newPlayerName.trim() || players.length >= 8) return;
    setPlayers([
      ...players,
      { id: Date.now(), name: newPlayerName, isHost: false, isReady: true },
    ]);
    setNewPlayerName("");
  };

  return (
    <div className="min-h-screen bg-bg p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-bg to-bg -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-strong rounded-3xl p-8 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Xona: <span className="text-red-500">M4821</span></h1>
          <p className="text-gray-400 text-sm">O'yinchilar: {players.length} / 8</p>
        </div>

        {/* O'yinchilar ro'yxati */}
        <div className="space-y-3 mb-8">
          {players.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.isHost ? "👑" : "👤"}</span>
                <span className="text-white font-medium">{p.name}</span>
              </div>
              <span className={`text-sm ${p.isReady ? "text-green-500" : "text-gray-500"}`}>
                {p.isReady ? "Tayyor" : "Kutilmoqda"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Test uchun o'yinchi qo'shish */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Sun'iy o'yinchi ismi"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-red-500"
          />
          <button onClick={addPlayer} className="bg-white/10 hover:bg-white/20 px-4 rounded-xl text-white transition">
            +
          </button>
        </div>

        <NeonButton 
          onClick={() => onStartGame(players)} 
          className="w-full py-4 text-lg shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-500/50"
          disabled={players.length < 3} // Test uchun 3 ta qildik
        >
          O'yinni Boshlash
        </NeonButton>
        {players.length < 3 && <p className="text-center text-xs text-red-400 mt-2">Kamida 3 kishi kerak</p>}
      </motion.div>
    </div>
  );
}
