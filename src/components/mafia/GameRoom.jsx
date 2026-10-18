import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Moon, Sun, Eye, Shield, Crosshair } from "lucide-react";
import VotingScreen from "./VotingScreen";

export default function GameRoom({ myRole, players, onOpenCard, isCardOpened, phase, timeLeft, onPhaseEnd }) {
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Sardor_uz", text: "Assalomu alaykum!", time: "16:42" },
    { id: 2, user: "Aziza_07", text: "O'yin qiziqarli bo'lsin 😊", time: "16:43" },
  ]);
  const [actionDone, setActionDone] = useState(false);

  useEffect(() => {
    if (isCardOpened) {
      const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-horror-suspense-ambience-550.mp3");
      audio.loop = true;
      audio.volume = 0.15;
      audio.play().catch(() => {});
      return () => audio.pause();
    }
  }, [isCardOpened]);

  // Har safar faza o'zgarganda tugmalarni qayta yoqish
  useEffect(() => { setActionDone(false); }, [phase]);

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), user: "Siz", text: chatMsg, time: "Hozir" }]);
    setChatMsg("");
  };

  const handleAction = (playerName) => {
    setActionDone(true);
    // Ovoz effekti
    new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3").play().catch(()=>{});
  };

  // Tunda harakat qilish ekrani
  const renderNightAction = () => {
    if (phase !== 'night' || !isCardOpened) return null;

    const actions = {
      mafia: { title: "Qurbonni tanlang", icon: <Crosshair className="text-red-500"/>, color: "hover:bg-red-500/30" },
      doctor: { title: "Kimni davolaysiz?", icon: <Shield className="text-green-500"/>, color: "hover:bg-green-500/30" },
      detective: { title: "Kimni tekshirasiz?", icon: <Eye className="text-blue-500"/>, color: "hover:bg-blue-500/30" }
    };

    const currentAction = actions[myRole];
    if (!currentAction || actionDone) return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
         <p className="text-gray-400 animate-pulse">Kuting...</p>
      </div>
    );

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-full border-2 border-purple-500/50 p-4 z-20">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-3">{currentAction.icon} {currentAction.title}</h3>
        <div className="grid grid-cols-2 gap-2 w-full max-w-[250px]">
          {players.filter(p => p.name !== "Siz").map((p, i) => (
            <button key={i} onClick={() => handleAction(p.name)} className={`glass p-2 rounded-lg text-xs transition ${currentAction.color} text-white`}>
              {p.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Orqa fon */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F] opacity-90" />

      {/* Tepa panel */}
      <header className="relative z-10 flex flex-wrap items-center justify-between p-3 glass-strong border-b border-white/10 mx-2 mt-2 rounded-xl gap-2">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">S2S MAFIA</h1>
        </div>
        
        <div className={`px-3 py-1 rounded-lg flex items-center gap-2 border text-xs ${phase === 'day' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : phase === 'night' ? 'bg-blue-900/40 border-blue-500/50 text-blue-400' : 'bg-red-900/40 border-red-500/50 text-red-400'}`}>
          {phase === 'day' ? <Sun size={14} /> : phase === 'night' ? <Moon size={14} /> : <Eye size={14} />}
          <span className="font-bold uppercase tracking-widest">{phase === 'day' ? 'KUNDUZ' : phase === 'night' ? 'TUN' : 'OVOZ'}</span>
          {phase !== 'voting' && <span className="font-mono text-sm ml-1">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>}
        </div>

        <div className="text-xs text-gray-400">{players.length} o'yinchi</div>
      </header>

      {/* Asosiy qism */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row gap-3 p-2 md:p-4 overflow-hidden">
        
        {/* Chap panel: O'yinchilar (Telefonda tepada scroll bo'ladi) */}
        <div className="w-full lg:w-64 glass-strong rounded-xl p-3 flex flex-col gap-2 overflow-y-auto max-h-[120px] lg:max-h-full shrink-0">
          <h3 className="text-gray-400 text-[10px] font-bold mb-1 uppercase tracking-wider">O'yinchilar</h3>
          {players.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-900 flex items-center justify-center text-[10px]">👤</div>
                <span className="text-xs">{p.name}</span>
              </div>
              {p.isHost && <span className="text-[8px] bg-purple-500/30 text-purple-300 px-1 py-0.5 rounded">Host</span>}
            </div>
          ))}
        </div>

        {/* Markaz: Stol, Karta va Harakatlar */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[350px]">
          
          {phase === 'voting' ? (
            <VotingScreen players={players} onVoteEnd={onPhaseEnd} />
          ) : (
            <>
              {/* Dumaloq stol */}
              <div className="absolute w-[90%] h-[90%] max-w-[400px] max-h-[400px] rounded-full border-[6px] border-purple-900/40 shadow-[0_0_80px_rgba(168,85,247,0.2)_inset] bg-[#0A0A0F]/60 backdrop-blur-md -z-10 flex items-center justify-center">
                 <div className="text-purple-900/30 text-6xl font-display font-bold">S2S</div>
              </div>

              {/* Karta */}
              <AnimatePresence>
                {!isCardOpened ? (
                  <motion.div
                    initial={{ scale: 0.8, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={onOpenCard}
                    className="cursor-pointer w-32 h-44 bg-gradient-to-br from-purple-900 to-black rounded-xl border border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex flex-col items-center justify-center z-10"
                  >
                    <span className="text-4xl mb-2">👁️</span>
                    <span className="font-bold tracking-widest text-purple-300 text-[10px] text-center px-2">KARTANI OCHISH</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-32 h-44 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-600 flex flex-col items-center justify-center shadow-2xl z-10"
                  >
                    <span className="text-[10px] text-gray-400 mb-1">Rolingiz:</span>
                    <span className="text-lg font-bold text-white uppercase text-center px-1">{myRole}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tungi Harakatlar Ekrani */}
              {renderNightAction()}
            </>
          )}
        </div>

        {/* O'ng panel: Chat (Telefonda pastda) */}
        <div className="w-full lg:w-72 glass-strong rounded-xl flex flex-col overflow-hidden max-h-[250px] lg:max-h-full shrink-0">
          <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
            <MessageSquare size={14} className="text-purple-400" />
            <h3 className="font-bold text-xs">Chat</h3>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="flex flex-col gap-1">
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span className="text-purple-400 font-bold">{m.user}</span>
                  <span>{m.time}</span>
                </div>
                <div className="bg-white/10 p-2 rounded-lg text-xs text-gray-200">
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-white/10 bg-black/40 flex gap-1">
            <input
              type="text"
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Xabar yozing..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-purple-500 text-white"
            />
            <button onClick={sendMessage} className="p-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
              <Send size={14} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 
