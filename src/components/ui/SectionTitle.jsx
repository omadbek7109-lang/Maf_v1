import { motion } from "framer-motion";

export default function SectionTitle({ title, subtitle, gradientWord }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
        <span className="text-white">{title} </span>
        {gradientWord && <span className="gradient-text">{gradientWord}</span>}
      </h2>
      {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
    </motion.div>
  );
}
