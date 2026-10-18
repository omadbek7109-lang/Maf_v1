import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MafiaPage from "./pages/MafiaPage"; // Yangi import

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mafia" element={<MafiaPage />} /> {/* Yangi route */}
    </Routes>
  );
}
