"use client";
import { useGameStore } from "@/stores/gameStore";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import SponsorsAds from "../_components/SponsorsAds";
import AssistanceBox from "../_components/AssistanceBox";
import TeamScoreCard from "../_components/TeamScoreCard";
import NavigationControls from "../_components/NavigationControls";
import CategoryGrid from "../_components/CategoryGrid";
import NewCategoryGrid from "../_components/NewCategoryGrid";

const calculateVersion1Config = (w: number, h: number) => {
  if (w < 640) return { items: 3, shift: 3 };
  if (h < 900) return { items: 4, shift: 4 };
  return { items: 6, shift: 6 };
};

const calculateVersion2Config = (w: number, h: number) => {
  if (w >= 740) {
    return { items: 6, shift: 6 };
  }

  return { items: 4, shift: 4 };
};

export default function Page() {
  const game = useGameStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [config, setConfig] = useState({ items: 6, shift: 6 });
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleResize = () => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const newConfig =
      game?.layoutType === "version1"
        ? calculateVersion1Config(w, h)
        : calculateVersion2Config(w, h);

    setConfig(newConfig);
    setCurrentPage(0);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [game?.layoutType]);

  const totalPages = useMemo(() => {
    const totalItems = game?.categories?.length || 0;
    if (totalItems <= config.items) return 1;

    return Math.ceil((totalItems - config.items) / config.shift) + 1;
  }, [game?.categories, config]);

  const handleQuestionClick = (questionId: string) => {
    const gameStore = useGameStore.getState();
    let url = `/game/${game.id}/question/${questionId}`;

    if (gameStore.pendingDoublePoint) {
      url += "?assistant=doublePoint";
      gameStore.setPendingDoublePoint(false);
    } else if (gameStore.pendingTakePoint) {
      url += "?assistant=takePoint";
      gameStore.setPendingTakePoint(false);
    } else if (gameStore.pendingSilence) {
      url += "?assistant=silence";
      gameStore.setPendingSilence(false);
    }
    router.push(url);
  };

  if (!isMounted) return null;

  return (
    <div className="h-full sm:h-fit lg:h-full w-full">
      {game?.layoutType === "version1" ? (
        <div className="flex justify-between sm:justify-center items-center gap-5  sm:gap-1 lg:gap-5 flex-col sm:flex-row h-full md:px-11">
          <div className="flex flex-col justify-center h-full items-center w-full ">
            <NewCategoryGrid
              categories={game?.categories || []}
              currentPage={currentPage}
              itemsPerPage={config.items}
              shiftAmount={config.shift}
              onQuestionClick={handleQuestionClick}
              game={game}
            />
            <NavigationControls
              className="flex sm:hidden"
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
              onNext={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
            />
          </div>
          <NavigationControls
            className="hidden sm:flex sm:flex-col"
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
            onNext={() =>
              setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
            }
          />
          <div className="flex flex-row sm:flex-col gap-3 md:gap-10 3xl:gap-14 w-full sm:w-1/3 bg-light-purple sm:bg-transparent p-2 py-1 pb-10 md:pb-1">
            <div className="w-1/2 sm:w-full flex flex-col gap-2">
              <TeamScoreCard teamName={game?.teamOneName} teamNumber={1} />
              <AssistanceBox team={1} context="gameboard" />
            </div>
            <div className="w-1/2 sm:w-full flex flex-col gap-2">
              <TeamScoreCard teamName={game?.teamTwoName} teamNumber={2} />
              <AssistanceBox team={2} context="gameboard" />
            </div>
            <div className="hidden lg:block">
              {" "}
              <SponsorsAds />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:h-full w-full md:mt-10 lg:mt-0">
          <div className="py-2 flex flex-col justify-around h-full my-auto md:px-10">
            <CategoryGrid
              categories={game?.categories || []}
              currentPage={currentPage}
              itemsPerPage={config.items}
              shiftAmount={config.shift}
              onQuestionClick={handleQuestionClick}
              game={game}
            />
            <NavigationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage((p) => Math.max(0, p - 1))}
              onNext={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
            />
          </div>
          <div className="p-2 py-1 lg:py-3 xl:py-5 bg-light-purple w-full flex justify-center items-center h-fit pb-10 md:pb-1 md:px-10">
            <div className="w-1/2 sm:w-2/5 px-2 flex gap-2 justify-center items-center flex-col sm:flex-row ">
              <TeamScoreCard teamName={game?.teamOneName} teamNumber={1} />
              <div className="w-full sm:w-2/3">
                <AssistanceBox team={1} context="gameboard" />
              </div>
            </div>
            <SponsorsAds />
            <div className="w-1/2 sm:w-2/5 px-2 flex gap-2 justify-center items-center flex-col-reverse sm:flex-row">
              <div className="w-full sm:w-2/3">
                <AssistanceBox team={2} context="gameboard" />
              </div>
              <TeamScoreCard teamName={game?.teamTwoName} teamNumber={2} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
