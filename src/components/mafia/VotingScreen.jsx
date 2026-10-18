import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function VotingScreen({ players, onVoteEnd }) {
  const [timeLeft, setTimeLeft] = useState(45); // 45 sekund
  const [votedPlayer, setVotedPlayer] = useState(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      onVoteEnd(); // Vaqt tugasa avto o'tadi
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onVoteEnd]);

  const handleVote = (player) => {
    if (votedPlayer) return; // Ikki marta bosishni oldini olish
    setVotedPlayer(player.name);
    
    // Ovoz berilgandan so'ng 2 sekunddan keyin keyingi fazaga o'tamiz 
    setTimeout(() => {
      onVoteEnd();
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative w-full p-2">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="glass-strong rounded-2xl p-4 md:p-6 w-full max-w-md border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
      >
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold text-white">Kimni chiqaramiz?</h2>
          <div className="text-xl font-mono text-red-500 font-bold">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {players.map((p, i) => (
            <button
              key={i}
              onClick={() => handleVote(p)}
              disabled={votedPlayer !== null}
              className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                votedPlayer === p.name 
                  ? "bg-red-500/30 border-red-500 text-white scale-95" 
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-sm">👤</div>
              <span className="text-xs font-medium truncate w-full text-center">{p.name}</span>
            </button>
          ))}
        </div>

        {votedPlayer && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-green-400 flex items-center justify-center gap-2 text-sm">
            <CheckCircle size={16} /> Ovoz berildi! Natija hisoblanmoqda...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
