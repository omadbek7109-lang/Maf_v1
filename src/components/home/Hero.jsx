import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NeonOrb from "../ui/NeonOrb";
import FloatingCoin from "../ui/FloatingCoin";
import NeonButton from "../ui/NeonButton";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-20">
      <NeonOrb color="#A855F7" size={500} x="10%" y="20%" delay={0} />
      <NeonOrb color="#3B82F6" size={400} x="70%" y="10%" delay={2} />
      <NeonOrb color="#06B6D4" size={350} x="50%" y="70%" delay={4} />

      <FloatingCoin delay={0} size={50} x="15%" y="30%" />
      <FloatingCoin delay={1.5} size={40} x="80%" y="25%" />
      <FloatingCoin delay={3} size={60} x="75%" y="70%" />
      <FloatingCoin delay={0.8} size={35} x="20%" y="75%" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-neon-green"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm text-slate-300">Yangi mavsum boshlandi</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Guruhingizni</span><br />
          <span className="gradient-text neon-text">reytingda birinchi</span><br />
          <span className="text-white">qiling!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          Mafia, Quiz, Shaxmat o'ynang — tanga ishlang, guruh reytingida ko'tariling
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <NeonButton onClick={() => navigate("/mafia")}>
            Mafia o'ynash
          </NeonButton>
          <NeonButton variant="secondary" onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}>
            O'yinlarni ko'rish
          </NeonButton>
        </motion.div>
      </div>
    </section>
  );
}
