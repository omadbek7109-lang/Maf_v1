import { useState } from "react";
import MafiaLobby from "../components/mafia/MafiaLobby";
import RoleCard from "../components/mafia/RoleCard";
import GamePhase from "../components/mafia/GamePhase"; // Yangi import

export default function MafiaPage() {
  const [gameState, setGameState] = useState("lobby"); // lobby | revealing | playing | finished
  const [myRole, setMyRole] = useState(null);
  const [players, setPlayers] = useState([]);

  const startGame = (lobbyPlayers) => {
    setPlayers(lobbyPlayers);
    
    // Tasodifiy rol berish
    const roles = ["mafia", "doctor", "detective", "citizen", "citizen"];
    const assignedRole = roles[Math.floor(Math.random() * roles.length)];
    
    setMyRole(assignedRole);
    setGameState("revealing");
  };

  const closeRoleCard = () => {
    setGameState("playing"); // Rol ko'rildi -> O'yinga o'tish
  };

  const finishGame = () => {
    setGameState("finished");
  };

  return (
    <div className="min-h-screen bg-bg">
      {gameState === "lobby" && <MafiaLobby onStartGame={startGame} />}
      
      {gameState === "revealing" && myRole && (
        <RoleCard role={myRole} onClose={closeRoleCard} />
      )}

      {gameState === "playing" && (
        <GamePhase myRole={myRole} players={players} onFinish={finishGame} />
      )}

      {gameState === "finished" && (
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
          <h1 className="text-5xl font-display text-red-500 mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">O'YIN TUGADI</h1>
          <p className="text-gray-400 mb-8">Keyingi bosqichda g'oliblar aniqlanadi</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition">
            Qaytadan o'ynash
          </button>
        </div>
      )}
    </div>
  );
} 
