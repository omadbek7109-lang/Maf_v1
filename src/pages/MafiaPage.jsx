import { useState } from "react";
import MafiaLobby from "../components/mafia/MafiaLobby";
import RoleCard from "../components/mafia/RoleCard";

export default function MafiaPage() {
  const [gameState, setGameState] = useState("lobby"); // lobby | revealing | night
  const [myRole, setMyRole] = useState(null);

  const startGame = (players) => {
    // Rollarni tasodifiy taqsimlash (Mafia, Doctor, Detective, Citizens)
    const roles = ["mafia", "doctor", "detective"];
    // Qolgan o'yinchilarga citizen beriladi
    const assignedRole = roles[Math.floor(Math.random() * roles.length)];
    
    setMyRole(assignedRole);
    setGameState("revealing");
  };

  const closeRoleCard = () => {
    setGameState("night"); // Rolni ko'rgach, kecha boshlanadi (keyingi bosqichda)
  };

  return (
    <div className="min-h-screen bg-bg">
      {gameState === "lobby" && <MafiaLobby onStartGame={startGame} />}
      
      {gameState === "revealing" && myRole && (
        <RoleCard role={myRole} onClose={closeRoleCard} />
      )}

      {gameState === "night" && (
        <div className="min-h-screen flex items-center justify-center text-white">
          <h1 className="text-4xl font-display">Kecha boshlanmoqda... 🌙</h1>
          <p className="mt-4 text-gray-400">Keyingi bosqichda o'yin mexanikasi ulanadi</p>
        </div>
      )}
    </div>
  );
}
