import { useNavigate } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";
import GlassCard from "../ui/GlassCard";

const games = [
  { icon: "🎭", title: "Mafia", desc: "Ijtimoiy o'yin. Do'stlaringiz bilan real vaqtda o'ynang.", color: "#EC4899", path: "/mafia" },
  { icon: "🧠", title: "Quiz", desc: "Bilimingizni sinab ko'ring. Har bir to'g'ri javob — tanga.", color: "#06B6D4", path: "/quiz" },
  { icon: "♟️", title: "Shaxmat", desc: "Strategiya va mantiq. Raqibingizni yutib, tanga ishlang.", color: "#A855F7", path: "/chess" },
];

export default function GamesGrid() {
  const navigate = useNavigate();

  return (
    <section id="games" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="O'yin" gradientWord="tanlang" subtitle="Har bir o'yinda tanga ishlang va guruh reytingida ko'tariling" />
        
        <div className="grid md:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <GlassCard key={game.title} delay={i * 0.15} className="cursor-pointer group" onClick={() => navigate(game.path)}>
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{game.icon}</div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: game.color }}>{game.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{game.desc}</p>
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: game.color }}>
                <span>O'ynash</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
