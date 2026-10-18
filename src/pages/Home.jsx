import { useState } from "react";
import CinematicIntro from "../components/intro/CinematicIntro";
import Hero from "../components/home/Hero";
import GamesGrid from "../components/home/GamesGrid";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  if (!introFinished) {
    return <CinematicIntro onComplete={() => setIntroFinished(true)} />;
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <Hero />
      <GamesGrid />
    </div>
  );
}
