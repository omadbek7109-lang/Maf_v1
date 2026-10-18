import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Moon, Sun, Eye } from "lucide-react";

export default function GameRoom({ myRole, players, onOpenCard, isCardOpened, phase, timeLeft }) {
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Sardor_uz", text: "Assalomu alaykum!", time: "16:42" },
    { id: 2, user: "Aziza_07", text: "O'yin qiziqarli bo'lsin 😊", time: "16:43" },
  ]);

  // Sirli fon musiqasi (Ovoz faqat foydalanuvchi ekranga bosgandan keyin ishlaydi)
  useEffect(() => {
    if (isCardOpened) {
      const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-horror-suspense-ambience-550.mp3");
      audio.loop = true;
      audio.volume = 0.2; // Past ovoz
      audio.play().catch(e => console.log("Audio blocked by browser"));
      return () => audio.pause(); // Komponent yopilganda ovozni to'xtatish
    }
  }, [isCardOpened]);

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), user: "Siz", text: chatMsg, time: "Hozir" }]);
    setChatMsg("");
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans relative overflow-hidden">
      
      {/* Orqa fon effekti (Xona) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F] opacity-90" />

      {/* Tepa panel */}
      <header className="relative z-10 flex items-center justify-between p-4 glass-strong border-b border-white/10 mx-4 mt-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">S2S MAFIA</h1>
          <span className="hidden md:inline text-sm text-gray-400">Xona: #4827</span>
        </div>
        
        {/* Markaziy Faza (Kecha/Kunduz) */}
        <div className={`px-6 py-2 rounded-xl flex items-center gap-3 border ${phase === 'day' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-blue-900/40 border-blue-500/50 text-blue-400'}`}>
          {phase === 'day' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-bold tracking-widest uppercase">{phase === 'day' ? 'Kunduzgi faza' : 'Kechki faza'}</span>
          <span className="font-mono text-xl ml-2">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
        </div>

        <div className="text-sm text-gray-400">6 / 10 o'yinchi</div>
      </header>

      {/* Asosiy qism */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row gap-4 p-4">
        
        {/* Chap panel: O'yinchilar */}
        <div className="w-full md:w-64 glass-strong rounded-2xl p-4 flex flex-col gap-2">
          <h3 className="text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">O'yinchilar</h3>
          {players.map((p, i) => (
            <div key={i} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center text-xs">👤</div>
                <span className="text-sm">{p.name}</span>
              </div>
              {p.isHost && <span className="text-[10px] bg-purple-500/30 text-purple-300 px-2 py-1 rounded">Host</span>}
            </div>
          ))}
        </div>

        {/* Markaz: Stol va Kartalar */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
          
          {/* Orqadagi katta dumaloq stol effekti */}
          <div className="absolute w-[80%] h-[80%] max-w-[600px] max-h-[600px] rounded-full border-[10px] border-purple-900/30 shadow-[0_0_100px_rgba(168,85,247,0.2)_inset] bg-[#0A0A0F]/80 backdrop-blur-sm -z-10" />

          {/* O'yin holati matni */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="glass px-8 py-4 rounded-2xl text-center mb-8 border border-white/10"
          >
            <h2 className="text-xl font-bold text-purple-300">Kartalar tarqatilmoqda...</h2>
            <p className="text-sm text-gray-400">Iltimos, kuting</p>
          </motion.div>

          {/* Katta Karta */}
          <AnimatePresence>
            {!isCardOpened ? (
              <motion.div
                initial={{ scale: 0.8, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={onOpenCard}
                className="cursor-pointer w-48 h-64 bg-gradient-to-br from-purple-900 to-black rounded-2xl border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.5)] flex flex-col items-center justify-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30" />
                <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">👁️</span>
                <span className="font-bold tracking-widest text-purple-300">KARTANI OCHISH</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-48 h-64 bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-gray-500 flex flex-col items-center justify-center shadow-2xl"
              >
                <span className="text-sm text-gray-400 mb-2">Sizning rolingiz:</span>
                <span className="text-2xl font-bold text-white uppercase">{myRole}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* O'ng panel: Chat */}
        <div className="w-full md:w-80 glass-strong rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
            <MessageSquare size={18} className="text-purple-400" />
            <h3 className="font-bold">Chat</h3>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[300px] md:max-h-full">
            {messages.map((m) => (
              <div key={m.id} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="text-purple-400 font-bold">{m.user}</span>
                  <span>{m.time}</span>
                </div>
                <div className="bg-white/10 p-2 rounded-lg text-sm text-gray-200">
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
            <input
              type="text"
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Xabar yozing..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-purple-500 text-white"
            />
            <button onClick={sendMessage} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition">
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
