"use client";
import { getGameComplete } from "@/core/game/game-complite-service";
import { useGameStore } from "@/stores/gameStore";
import { Category, Game } from "@/type/api/game/game.type";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GamePageHeader from "../_components/GamePageHeader";
import { Loading } from "../../_components/loading/loading";
import { usePreloadMedia } from "@/hooks/usePreloadMedia";
import GameOverModal from "../_components/GameOverModal";
import LogoMotionLoading from "../../_components/logoMotionLoading/LogoMotionLoading";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id as string;
  const isWinnerPage = pathname.includes("/winner");
  const setGame = useGameStore((s) => s.setGame);
  const reset = useGameStore((state) => state.resetGame);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [showGameOverMOdal, setShowGameOverModal] = useState(false);
  const {
    data: gameData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameComplete({ id }),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (gameData?.success) {
      reset();
      setGame(gameData.data as Game);

      if (gameData?.data) {
        if (gameData?.data?.isGameFinished && !isWinnerPage) {
          setShowGameOverModal(true);
        }
        const media = new Set<string>();
        for (const category of gameData.data.categories) {
          if (category.picture?.downloadUrl)
            media.add(category.picture.downloadUrl);

          for (const question of category.questions) {
            if (question.questionMedia?.downloadUrl)
              media.add(question.questionMedia.downloadUrl);
            if (question.answerMedia?.downloadUrl)
              media.add(question.answerMedia.downloadUrl);

            for (const option of question.options) {
              if (option.media?.downloadUrl)
                media.add(option.media.downloadUrl);
            }
          }
        }

        setMediaUrls(Array.from(media));

        const hasViewport = !!document.head.querySelector(
          'meta[name="viewport"]'
        );
        if (!hasViewport) {
          const meta = document.createElement("meta");
          meta.name = "viewport";
          meta.content =
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover";
          document.head.appendChild(meta);
        }
      }
    }
  }, [gameData, setGame]);

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);

      const handleResize = () => {
        setHeaderHeight(headerRef.current?.offsetHeight || 0);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [gameData]);

  usePreloadMedia(mediaUrls, {
    audioPreload: "metadata",
    videoPreload: "metadata",
    primeCache: true,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center py-20 w-screen h-screen items-center backdrop-blur-3xl absolute top-0 left-0 z-[1000]">
        <LogoMotionLoading />
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
        className=" flex flex-col h-full justify-between md:justify-center lg:justify-between md:overflow-scroll"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        {children}
      </div>
      <GameOverModal
        isOpen={showGameOverMOdal}
        onClose={() => setShowGameOverModal(false)}
      />
    </div>
  );
}
