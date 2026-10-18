import { motion } from "framer-motion";

export default function NeonButton({ children, onClick, variant = "primary", className = "", ...props }) {
  const baseStyle = "px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-neon-purple to-neon-blue shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]",
    secondary: "glass border border-white/20 hover:border-neon-cyan/50",
    danger: "bg-gradient-to-r from-red-500 to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}
