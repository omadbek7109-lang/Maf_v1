import { useState, useEffect } from "react";
import MafiaLobby from "../components/mafia/MafiaLobby";
import GameRoom from "../components/mafia/GameRoom";

export default function MafiaPage() {
  const [gameState, setGameState] = useState("lobby");
  const [myRole, setMyRole] = useState(null);
  const [players, setPlayers] = useState([]);
  
  const [phase, setPhase] = useState("day"); 
  const [timeLeft, setTimeLeft] = useState(110); // Kunduz 110
  const [isCardOpened, setIsCardOpened] = useState(false);

  const startGame = (lobbyPlayers) => {
    setPlayers(lobbyPlayers);
    let roles = [];
    const count = lobbyPlayers.length;
    const mafiaCount = Math.max(1, Math.floor(count / 3));
    for(let i=0; i<mafiaCount; i++) roles.push("mafia");
    if(count > 4) roles.push("doctor");
    if(count > 5) roles.push("detective");
    while(roles.length < count) roles.push("citizen");
    
    const myAssignedRole = roles[Math.floor(Math.random() * roles.length)];
    setMyRole(myAssignedRole);
    setGameState("playing");
    setPhase("day"); 
    setTimeLeft(110); 
  };

  useEffect(() => {
    if (gameState !== "playing" || phase === "voting") return;
    
    if (timeLeft <= 0) {
      if (phase === "day") {
        setPhase("voting");
      } else if (phase === "night") {
        setPhase("day");
        setTimeLeft(110);
      }
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, phase, gameState]);

  const handleVoteEnd = () => {
    setPhase("night");
    setTimeLeft(45); // Tun 45 soniya
  };

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
          onPhaseEnd={handleVoteEnd}
        />
      )}
    </div>
  );
} 
