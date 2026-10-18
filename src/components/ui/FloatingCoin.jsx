import { motion } from "framer-motion";

export default function FloatingCoin({ delay = 0, size = 60, x = "0%", y = "0%" }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -30, 0],
        rotateY: [0, 360],
        rotateX: [0, 10, 0],
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        rotateY: { duration: 6, repeat: Infinity, ease: "linear", delay },
        rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div
        className="rounded-full flex items-center justify-center font-bold"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
          boxShadow: "0 0 30px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(255,255,255,0.3)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          fontSize: size * 0.4,
          color: "#78350F",
        }}
      >
        🪙
      </div>
    </motion.div>
  );
}
