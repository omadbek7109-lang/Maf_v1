import { useState, useEffect } from "react";
import MafiaLobby from "../components/mafia/MafiaLobby";
import GameRoom from "../components/mafia/GameRoom";

export default function MafiaPage() {
  const [gameState, setGameState] = useState("lobby");
  const [myRole, setMyRole] = useState(null);
  const [players, setPlayers] = useState([]);
  
  const [phase, setPhase] = useState("day"); 
  const [timeLeft, setTimeLeft] = useState(45); // Kunduz 45 sekund
  const [isCardOpened, setIsCardOpened] = useState(false);

  // Rollarni o'yinchilar soniga qarab taqsimlash funksiyasi
  const assignRoles = (count) => {
    let roles = [];
    
    // 1. Mafia va Don (Mafiya jamoasi)
    // Har 3-4 kishiga 1 ta mafia to'g'ri keladi
    const mafiaTeamCount = Math.max(1, Math.floor(count / 3.5));
    
    if (count >= 6) {
      roles.push("don"); // Agar 6 va undan ko'p bo'lsa Don qo'shiladi
      for (let i = 1; i < mafiaTeamCount; i++) roles.push("mafia");
    } else {
      for (let i = 0; i < mafiaTeamCount; i++) roles.push("mafia");
    }

    // 2. Tinch aholi jamoasi (Maxsus rollar)
    if (count >= 4) roles.push("doctor");
    if (count >= 5) roles.push("detective");

    // 3. Qolganlari oddiy Tinch aholi
    while (roles.length < count) {
      roles.push("citizen");
    }

    // Rollarni tasodifiy aralashtirish (Fisher-Yates algoritmi)
    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    return roles;
  };

  const startGame = (lobbyPlayers) => {
    setPlayers(lobbyPlayers);
    const count = lobbyPlayers.length;
    
    // Rollarni taqsimlash
    const assignedRoles = assignRoles(count);
    
    // Hozircha o'zimizga (birinchi o'yinchiga) tasodifiy rol beramiz
    // Server ulanganda bu yerda har bir o'yinchi o'z ID si orqali o'z rolini oladi
    const myAssignedRole = assignedRoles[0]; 
    
    setMyRole(myAssignedRole);
    setGameState("playing");
    setPhase("day"); 
    setTimeLeft(45); 
    setIsCardOpened(false);
  };

  // Taymer mantiqi
  useEffect(() => {
    if (gameState !== "playing" || phase === "voting") return; // Ovoz berishda taymer VotingScreen ichida ishlaydi
    
    if (timeLeft <= 0) {
      if (phase === "day") {
        setPhase("voting"); // Kunduz tugadi -> Ovoz berishga o'tamiz
      } else if (phase === "night") {
        setPhase("day"); // Tun tugadi -> Kunduzga o'tamiz
        setTimeLeft(45);
      }
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, phase, gameState]);

  // Ovoz berish tugagach
  const handleVoteEnd = () => {
    setPhase("night");
    setTimeLeft(45); // Tun 45 sekund
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
