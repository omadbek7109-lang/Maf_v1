import { Routes, Route } from "react-router-dom";

// Hozircha faqat oddiy matn, keyingi qadamda haqiqiy Home sahifasini qo'shamiz
function HomePlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-white">
      <h1 className="text-4xl font-bold gradient-text">S2S GAME ishga tushdi! 🚀</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePlaceholder />} />
    </Routes>
  );
}
