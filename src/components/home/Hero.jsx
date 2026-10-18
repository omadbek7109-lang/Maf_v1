import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NeonOrb from "../ui/NeonOrb";
import FloatingCoin from "../ui/FloatingCoin";
import NeonButton from "../ui/NeonButton";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg pt-20">
      {/* 3D Grid Fon */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      <NeonOrb color="#EF4444" size={600} x="-10%" y="20%" delay={0} />
      <NeonOrb color="#A855F7" size={500} x="80%" y="10%" delay={2} />
      <NeonOrb color="#3B82F6" size={400} x="40%" y="80%" delay={4} />

      <FloatingCoin delay={0} size={50} x="15%" y="30%" />
      <FloatingCoin delay={1.5} size={40} x="85%" y="35%" />
      <FloatingCoin delay={3} size={60} x="75%" y="75%" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Kiberpank "Badge" */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass border-red-500/30 px-6 py-2 rounded-full mb-8 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm text-gray-300 tracking-widest uppercase">Tizimga kirish ruxsat etildi</span>
        </motion.div>

        {/* 3D Matn effekti */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter"
        >
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">O'YINDA</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
            G'OLIB BO'L
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto tracking-wide"
        >
          Guruhingizni yig'ing. Aqlingizni ishlating. <br className="hidden md:block"/> O'yinlar dunyosida o'z imperiyangizni quring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <NeonButton onClick={() => navigate("/mafia")} className="text-lg px-10 py-4 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.8)] border border-red-500/50">
            MAFIA O'YNASH
          </NeonButton>
          <NeonButton variant="secondary" onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}>
            Boshqa O'yinlar
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
} 
