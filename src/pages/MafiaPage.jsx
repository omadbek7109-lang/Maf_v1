import { useState, useEffect } from "react";
import MafiaLobby from "../components/mafia/MafiaLobby";
import GameRoom from "../components/mafia/GameRoom";
import GameOverScreen from "../components/mafia/GameOverScreen"; // Yangi import

export default function MafiaPage() {
  const [gameState, setGameState] = useState("lobby"); // lobby | playing | gameover
  const [myRole, setMyRole] = useState(null);
  const [players, setPlayers] = useState([]);
  const [allRoles, setAllRoles] = useState([]); // Barcha o'yinchilarning rollari
  const [deadPlayers, setDeadPlayers] = useState([]); // O'ldirilganlar
  
  const [phase, setPhase] = useState("day"); 
  const [timeLeft, setTimeLeft] = useState(45); 
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [winner, setWinner] = useState(null); // "mafia" | "citizen"

  // Rollarni o'yinchilar soniga qarab taqsimlash
  const assignRoles = (count) => {
    let roles = [];
    const mafiaTeamCount = Math.max(1, Math.floor(count / 3.5));
    
    if (count >= 6) {
      roles.push("don");
      for (let i = 1; i < mafiaTeamCount; i++) roles.push("mafia");
    } else {
      for (let i = 0; i < mafiaTeamCount; i++) roles.push("mafia");
    }

    if (count >= 4) roles.push("doctor");
    if (count >= 5) roles.push("detective");
    
    while (roles.length < count) roles.push("citizen");

    // Tasodifiy aralashtirish
    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }
    return roles;
  };

  const startGame = (lobbyPlayers) => {
    setPlayers(lobbyPlayers);
    const assignedRoles = assignRoles(lobbyPlayers.length);
    
    setAllRoles(assignedRoles);
    setMyRole(assignedRoles[0]); // Hozircha o'zimizga birinchi rolni beramiz
    setGameState("playing");
    setPhase("day"); 
    setTimeLeft(45); 
    setIsCardOpened(false);
    setDeadPlayers([]);
    setWinner(null);
  };

  // G'alaba shartlarini tekshirish funksiyasi
  const checkWinCondition = (currentDead) => {
    const aliveRoles = allRoles.filter((_, index) => !currentDead.includes(players[index]?.name));
    
    const mafiaCount = aliveRoles.filter(r => r === "mafia" || r === "don").length;
    const citizenCount = aliveRoles.filter(r => r !== "mafia" && r !== "don").length;

    if (mafiaCount === 0) {
      setWinner("citizen"); // Mafiyalar tugadi
      setGameState("gameover");
      return true;
    }
    if (mafiaCount >= citizenCount) {
      setWinner("mafia"); // Mafiyalar ko'payib ketdi
      setGameState("gameover");
      return true;
    }
    return false;
  };

  // Taymer mantiqi
  useEffect(() => {
    if (gameState !== "playing" || phase === "voting") return;
    
    if (timeLeft <= 0) {
      if (phase === "day") {
        setPhase("voting");
      } else if (phase === "night") {
        setPhase("day");
        setTimeLeft(45);
      }
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, phase, gameState]);

  // Ovoz berish tugagach (Kimdir chiqarildi)
  const handleVoteEnd = (eliminatedPlayer) => {
    let newDead = [...deadPlayers];
    if (eliminatedPlayer) {
      newDead.push(eliminatedPlayer);
      setDeadPlayers(newDead);
    }

    // G'alaba shartini tekshiramiz
    if (!checkWinCondition(newDead)) {
      setPhase("night");
      setTimeLeft(30); 
    }
  };

  const handlePlayAgain = () => {
    setGameState("lobby");
    setPlayers([]);
    setAllRoles([]);
    setDeadPlayers([]);
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

      {gameState === "gameover" && (
        <GameOverScreen 
          winner={winner} 
          players={players} 
          allRoles={allRoles} 
          onPlayAgain={handlePlayAgain} 
        />
      )}
    </div>
  );
} 
