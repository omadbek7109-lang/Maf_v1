import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicIntro({ onComplete }) {
  const [show, setShow] = useState(true);

  // 6 soniyadan keyin avtomatik yopiladi
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSkip();
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    setShow(false);
    setTimeout(() => {
      onComplete(); // Asosiy sahifaga o'tish
    }, 800); // 0.8s animatsiya bilan yo'qoladi
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Fon: Qizil va binafsha neon nurlar */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-red-900 rounded-full filter blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-purple-900 rounded-full filter blur-[100px] animate-pulse" />
          </div>

          {/* Tuman (Smoke effekti) */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/smoke.png')] opacity-20 mix-blend-screen animate-[pulse_4s_ease-in-out_infinite]" />

          {/* Kino uslubidagi matn */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 1 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-6xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_30px_rgba(255,0,0,0.8)] tracking-[0.2em]">
              MAFIA
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="text-red-500 tracking-widest mt-4 text-sm md:text-lg uppercase"
            >
              Shahar sirlari ochilmoqda...
            </motion.p>
          </motion.div>

          {/* O'tkazib yuborish tugmasi */}
          <button
            onClick={handleSkip}
            className="absolute bottom-10 right-10 z-20 text-gray-500 hover:text-white transition-colors text-sm tracking-widest uppercase border border-gray-700 px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            O'tkazib yuborish →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
