"use client";
import { getGameComplete } from "@/core/game/game-complite-service";
import { useGameStore } from "@/stores/gameStore";
import { Game } from "@/type/api/game/game.type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GamePageHeader from "../_components/GamePageHeader";
import { Loading } from "../../_components/loading/loading";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params.id as string;
  const setGame = useGameStore((s) => s.setGame);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const {
    data: gameData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameComplete({ id }),
    enabled: !!id,
  });

  useEffect(() => {
    if (gameData?.success) {
      setGame(gameData.data as Game);
    }
  }, [gameData, setGame]);

  // Measure header height after it renders
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);

      // Optional: handle window resize
      const handleResize = () => {
        setHeaderHeight(headerRef.current?.offsetHeight || 0);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [gameData]); // Re-measure when game data loads

  if (isLoading) {
    return (
      <div className="game-layout">
        <div className="fixed top-0 left-0 w-full h-full z-[9999] backdrop-blur-md bg-black/40 flex items-center justify-center">
          <Loading size="large" type="ring" variant="light-blue-gradient" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-layout">
        <div className="error text-white text-[100px] mt-[120px]">
          {gameData?.errors}
        </div>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen flex flex-col">
      <div ref={headerRef}>
        <GamePageHeader />
      </div>
      <div
        className=" flex flex-col justify-between "
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
