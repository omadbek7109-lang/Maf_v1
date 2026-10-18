import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Moon, Sun, Eye, Shield, Crosshair, Mic, MicOff, Crown } from "lucide-react";
import VotingScreen from "./VotingScreen";

// Rollar ma'lumotlari
const ROLE_DATA = {
  mafia: { name: "MAFIA", desc: "Kechasi tinch aholini o'ldiring", color: "text-red-500", icon: <Crosshair size={24} /> },
  don: { name: "DON", desc: "Mafiya boshlig'i. Komissarni toping.", color: "text-red-700", icon: <Crown size={24} /> },
  doctor: { name: "SHIFOKOR", desc: "Kechasi bitta odamni qutqaring", color: "text-green-500", icon: <Shield size={24} /> },
  detective: { name: "KOMISSAR", desc: "Kechasi bitta odamni tekshiring", color: "text-blue-500", icon: <Eye size={24} /> },
  citizen: { name: "TINCH AHOLI", desc: "Kunduzi mafiyani toping", color: "text-purple-400", icon: <Eye size={24} /> },
};

export default function GameRoom({ myRole, players, onOpenCard, isCardOpened, phase, timeLeft, onPhaseEnd }) {
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Sardor_uz", text: "Assalomu alaykum!", time: "16:42" },
  ]);
  const [actionDone, setActionDone] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);

  // Karta ochilish ovozi
  const openCardWithSound = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3");
    audio.play().catch(() => {});
    onOpenCard();
  };

  // Har safar faza o'zgarganda tungi harakatni reset qilish
  useEffect(() => { setActionDone(false); }, [phase]);

  // Tungi harakat (Mafia, Doctor, Detective uchun)
  const handleAction = (playerName) => {
    setActionDone(true);
    new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3").play().catch(()=>{});
  };

  const renderNightAction = () => {
    if (phase !== 'night' || !isCardOpened) return null;
    
    const actions = {
      mafia: { title: "Qurbonni tanlang", icon: <Crosshair className="text-red-500"/>, color: "hover:bg-red-500/30" },
      don: { title: "Komissarni toping", icon: <Crown className="text-red-600"/>, color: "hover:bg-red-600/30" },
      doctor: { title: "Kimni davolaysiz?", icon: <Shield className="text-green-500"/>, color: "hover:bg-green-500/30" },
      detective: { title: "Kimni tekshirasiz?", icon: <Eye className="text-blue-500"/>, color: "hover:bg-blue-500/30" }
    };
    const currentAction = actions[myRole];
    
    if (!currentAction || actionDone) return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full z-20">
         <p className="text-gray-400 animate-pulse text-sm">Harakat bajarildi...</p>
      </div>
    );

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-full border-2 border-purple-500/50 p-4 z-20">
        <h3 className="text-sm font-bold flex items-center gap-2 mb-3 text-white">{currentAction.icon} {currentAction.title}</h3>
        <div className="grid grid-cols-2 gap-2 w-full max-w-[220px]">
          {players.filter(p => p.name !== "Siz").map((p, i) => (
            <button key={i} onClick={() => handleAction(p.name)} className={`glass p-2 rounded-lg text-[10px] transition ${currentAction.color} text-white border border-white/10`}>
              {p.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Orqa fon rasmi */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F] opacity-95" />

      {/* Tepa panel */}
      <header className="relative z-10 flex items-center justify-between p-2 glass-strong border-b border-white/10 mx-2 mt-2 rounded-xl">
        <div className="flex flex-col">
          <h1 className="font-display text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">S2S MAFIA</h1>
          <span className="text-[10px] text-gray-400">Xona: #4821</span>
        </div>
        
        {/* Faza va Taymer */}
        <div className={`px-3 py-1.5 rounded-lg flex items-center gap-2 border text-[11px] ${phase === 'day' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : phase === 'night' ? 'bg-blue-900/40 border-blue-500/50 text-blue-400' : 'bg-red-900/40 border-red-500/50 text-red-400'}`}>
          {phase === 'day' ? <Sun size={12} /> : phase === 'night' ? <Moon size={12} /> : <Eye size={12} />}
          <span className="font-bold uppercase tracking-widest">{phase === 'day' ? 'KUNDUZ' : phase === 'night' ? 'TUN' : 'OVOZ'}</span>
          {phase !== 'voting' && <span className="font-mono text-sm ml-1 font-bold">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>}
        </div>
        
        <div className="text-[10px] text-gray-400">{players.length} o'yinchi</div>
      </header>

      {/* Asosiy o'yin maydoni */}
      <main className="relative z-10 flex-1 flex flex-col p-2 gap-2 overflow-hidden">
        
        {/* O'yinchilar ro'yxati (gorizontal scroll telefonda) */}
        <div className="w-full glass-strong rounded-xl p-2 flex gap-2 overflow-x-auto shrink-0 h-16 items-center">
          {players.map((p, i) => (
            <div key={i} className="flex flex-col items-center min-w-[50px]">
              <div className="w-8 h-8 rounded-full bg-purple-900 border border-purple-500/50 flex items-center justify-center text-xs">
                {p.isHost ? <Crown size={12} className="text-yellow-400" /> : "👤"}
              </div>
              <span className="text-[9px] text-gray-300 truncate w-12 text-center mt-1">{p.name}</span>
            </div>
          ))}
        </div>

        {/* Markaz: Stol va Karta */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
          
          {phase === 'voting' ? (
            <VotingScreen players={players} onVoteEnd={onPhaseEnd} />
          ) : (
            <>
              {/* 3D Stol */}
              <div className={`absolute w-[90%] h-[90%] max-w-[320px] max-h-[320px] rounded-full border-[6px] shadow-[0_0_80px_rgba(168,85,247,0.15)_inset] bg-[#0A0A0F]/70 backdrop-blur-sm -z-10 flex items-center justify-center transition-colors duration-1000 ${phase === 'night' ? 'border-blue-900/50' : 'border-orange-900/30'}`}>
                 <div className="text-purple-900/20 text-6xl font-display font-bold">S2S</div>
              </div>

              {/* O'yinchilar stol atrofida */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-5">
                {players.map((p, i) => {
                  const angle = (i / players.length) * Math.PI * 2;
                  const radius = 100; 
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`absolute w-6 h-6 rounded-full border flex items-center justify-center text-[10px] shadow-lg ${phase === 'night' ? 'bg-blue-900 border-blue-500' : 'bg-orange-900 border-orange-500'}`}
                      style={{
                        transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`
                      }}
                    >
                      👤
                    </motion.div>
                  );
                })}
              </div>

              {/* Karta ochish */}
              <AnimatePresence>
                {!isCardOpened ? (
                  <motion.div
                    initial={{ scale: 0.8, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 60px rgba(168,85,247,0.8)" }}
                    onClick={openCardWithSound}
                    className="cursor-pointer w-28 h-40 bg-gradient-to-br from-purple-900 to-black rounded-xl border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex flex-col items-center justify-center z-10"
                  >
                    <span className="text-3xl mb-2 animate-pulse">👁️</span>
                    <span className="font-bold tracking-widest text-purple-300 text-[9px] text-center px-2">KARTANI OCHISH</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotateX: 90 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`w-36 h-52 bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 relative overflow-hidden ${ROLE_DATA[myRole]?.color.replace('text', 'border')}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
                    
                    <div className={`mb-2 ${ROLE_DATA[myRole]?.color}`}>
                      {ROLE_DATA[myRole]?.icon}
                    </div>
                    <span className="text-[10px] text-gray-400 mb-1">Sizning rolingiz:</span>
                    <span className={`text-xl font-bold uppercase text-center px-1 mb-2 ${ROLE_DATA[myRole]?.color}`}>
                      {ROLE_DATA[myRole]?.name}
                    </span>
                    <p className="text-[10px] text-gray-400 text-center px-3 leading-tight">
                      {ROLE_DATA[myRole]?.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {renderNightAction()}
            </>
          )}
        </div>

        {/* Chat va Ovozli Chat paneli */}
        <div className="w-full glass-strong rounded-xl flex flex-col overflow-hidden h-48 shrink-0">
          <div className="p-2 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-purple-400" />
              <h3 className="font-bold text-xs">Chat</h3>
            </div>
            <button onClick={() => setIsMicOn(!isMicOn)} className={`p-1.5 rounded-full transition ${isMicOn ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {isMicOn ? <Mic size={14} /> : <MicOff size={14} />}
            </button>
          </div>
          
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((m) => (
              <div key={m.id} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[9px] text-gray-500">
                  <span className="text-purple-400 font-bold">{m.user}</span>
                  <span>{m.time}</span>
                </div>
                <div className="bg-white/10 p-1.5 rounded-lg text-xs text-gray-200 w-fit max-w-[90%]">
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-white/10 bg-black/40 flex gap-1">
            <input 
              type="text" 
              placeholder="Xabar yozing..." 
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && chatMsg.trim()) {
                  setMessages([...messages, { id: Date.now(), user: "Siz", text: chatMsg, time: "Hozir" }]);
                  setChatMsg("");
                }
              }}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-purple-500 text-white" 
            />
            <button 
              onClick={() => {
                if (chatMsg.trim()) {
                  setMessages([...messages, { id: Date.now(), user: "Siz", text: chatMsg, time: "Hozir" }]);
                  setChatMsg("");
                }
              }}
              className="p-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg transition"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
                                                                                                                                                                                                                                                    } 
