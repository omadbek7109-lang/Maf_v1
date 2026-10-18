import { useState, useEffect } from "react";
import MafiaLobby from "../components/mafia/MafiaLobby";
import RoleCard from "../components/mafia/RoleCard";
import GameRoom from "../components/mafia/GameRoom";

export default function MafiaPage() {
  const [gameState, setGameState] = useState("lobby"); // lobby | playing | finished
  const [myRole, setMyRole] = useState(null);
  const [players, setPlayers] = useState([]);
  
  // O'yin fazasi va vaqt
  const [phase, setPhase] = useState("day");
  const [timeLeft, setTimeLeft] = useState(120); // 2 daqiqa
  const [isCardOpened, setIsCardOpened] = useState(false);

  const startGame = (lobbyPlayers) => {
    setPlayers(lobbyPlayers);
    const roles = ["mafia", "doctor", "detective", "citizen", "citizen"];
    setMyRole(roles[Math.floor(Math.random() * roles.length)]);
    setGameState("playing");
    setIsCardOpened(false);
  };

  // Taymer mantiqi (Har safar faza o'zgarganda ishlaydi)
  useEffect(() => {
    if (gameState !== "playing") return;
    
    if (timeLeft <= 0) {
      if (phase === "day") {
        setPhase("night");
        setTimeLeft(45); // Tun 45 soniya
      } else {
        setPhase("day");
        setTimeLeft(120); // Kun 2 daqiqa
      }
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, phase, gameState]);

  return (
    <div className="min-h-screen bg-bg">
      {gameState === "lobby" && <MafiaLobby onStartGame={startGame} />}
      
      {gameState === "playing" && (
        <GameRoom 
          myRole={myRole} 
          players={players} 
          phase={phase}
          timeLeft={timeLeft}
          isCardOpened={isCardOpened}
          onOpenCard={() => setIsCardOpened(true)} 
        />
      )}

      {gameState === "finished" && (
        <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
          <h1 className="text-5xl font-display text-red-500 mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">O'YIN TUGADI</h1>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition">
            Qaytadan o'ynash
          </button>
        </div>
      )}
    </div>
  );
} 
