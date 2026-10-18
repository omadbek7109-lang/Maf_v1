import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ShieldAlert, Skull } from "lucide-react";

export default function VotingScreen({ players, onVoteEnd }) {
  const [timeLeft, setTimeLeft] = useState(45); // 45 sekund
  const [votedPlayer, setVotedPlayer] = useState(null);
  const [votes, setVotes] = useState({}); // { "O'yinchi ismi": ovozlar soni }
  const [isFinished, setIsFinished] = useState(false);

  // Taymer
  useEffect(() => {
    if (isFinished) return;
    
    if (timeLeft <= 0) {
      finishVoting();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  // Ovoz berish
  const handleVote = (playerName) => {
    if (votedPlayer || isFinished) return; // Ikki marta bosishni oldini olish

    setVotedPlayer(playerName);
    
    // Ovoz effekti
    new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3").play().catch(()=>{});

    // Ovozlarni hisoblash (Hozircha faqat bitta odam ovoz beryapti, 
    // lekin server ulanganda boshqa o'yinchilarning ovozlari ham qo'shiladi)
    setVotes((prev) => {
      const newVotes = { ...prev };
      newVotes[playerName] = (newVotes[playerName] || 0) + 1;
      return newVotes;
    });

    // Ovoz berilgandan so'ng 3 sekunddan keyin natijani ko'rsatish
    setTimeout(() => {
      finishVoting();
    }, 3000);
  };

  // Ovoz berishni yakunlash va natijani e'lon qilish
  const finishVoting = () => {
    if (isFinished) return;
    setIsFinished(true);

    // Eng ko'p ovoz olganni aniqlash
    let maxVotes = 0;
    let eliminated = null;
    let isTie = false;

    Object.entries(votes).forEach(([name, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        eliminated = name;
        isTie = false;
      } else if (count === maxVotes) {
        isTie = true;
      }
    });

    // Agar durang bo'lsa yoki hech kim ovoz olmasa, hech kim chiqmaydi
    if (isTie || !eliminated) {
      setTimeout(() => onVoteEnd(null), 3000);
    } else {
      setTimeout(() => onVoteEnd(eliminated), 3000);
    }
  };

  // Eng ko'p ovoz olgan o'yinchini topish (Vizual effekt uchun)
  const getTopVoted = () => {
    let max = 0;
    let top = null;
    Object.entries(votes).forEach(([name, count]) => {
      if (count > max) {
        max = count;
        top = name;
      }
    });
    return top;
  };

  const topVoted = getTopVoted();

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative w-full p-2 min-h-[350px]">
      
      <AnimatePresence>
        {!isFinished ? (
          // Ovoz berish jarayoni
          <motion.div 
            key="voting"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="glass-strong rounded-2xl p-4 w-full max-w-sm border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.2)] z-10"
          >
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-500" /> Kimni chiqaramiz?
              </h2>
              <div className="text-lg font-mono text-red-500 font-bold bg-red-500/10 px-2 py-0.5 rounded">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {players.map((p, i) => {
                const voteCount = votes[p.name] || 0;
                return (
                  <button
                    key={i}
                    onClick={() => handleVote(p.name)}
                    disabled={votedPlayer !== null}
                    className={`relative overflow-hidden p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                      votedPlayer === p.name 
                        ? "bg-red-500/30 border-red-500 text-white scale-95 shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-sm">👤</div>
                    <span className="text-[11px] font-medium truncate w-full text-center">{p.name}</span>
                    
                    {/* Ovozlar soni ko'rsatkichi */}
                    {voteCount > 0 && (
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                      >
                        {voteCount}
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {votedPlayer && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-green-400 flex items-center justify-center gap-2 text-xs">
                <CheckCircle size={14} /> Ovoz berildi! Natija hisoblanmoqda...
              </motion.div>
            )}
          </motion.div>
        ) : (
          // Natija ekrani
          <motion.div 
            key="result"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-2xl p-6 w-full max-w-sm border border-red-500/50 shadow-[0_0_60px_rgba(239,68,68,0.4)] z-10 text-center"
          >
            {topVoted ? (
              <>
                <motion.div 
                  initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring" }}
                  className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4 border border-red-500/50"
                >
                  <Skull size={32} className="text-red-500" />
                </motion.div>
                <h2 className="text-xl font-bold text-white mb-2">Shahar hukm chiqardi!</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Eng ko'p ovoz olgan o'yinchi: <br/>
                  <span className="text-red-400 font-bold text-lg">{topVoted}</span>
                </p>
                <p className="text-xs text-gray-500 animate-pulse">O'yin davom etmoqda...</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white mb-2">Durang!</h2>
                <p className="text-gray-300 text-sm mb-4">Hech kim chiqarilmadi.</p>
                <p className="text-xs text-gray-500 animate-pulse">Tun boshlanmoqda...</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
