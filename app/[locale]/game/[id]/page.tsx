// page.tsx

"use client";
import { useGameStore } from "@/stores/gameStore";
import React, { useState, useEffect, useMemo } from "react"; // ADDED useMemo
import { useRouter } from "next/navigation";
import SponsorsAds from "../_components/SponsorsAds";
import AssistanceBox from "../_components/AssistanceBox";
import TeamScoreCard from "../_components/TeamScoreCard";
import NavigationControls from "../_components/NavigationControls";
import CategoryGrid from "../_components/CategoryGrid";

// Define the shift amount (how many items the view slides by)
const SHIFT_AMOUNT = 2;

export default function Page() {
  const game = useGameStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const router = useRouter(); // --- Calculate Total Pages based on Overlap Logic ---

  const totalPages = useMemo(() => {
    const totalItems = game?.categories?.length || 0;
    if (totalItems <= itemsPerPage) return 1;
    // Calculate pages based on the shift amount
    // Total pages = Math.ceil((Total Items - Items Per Page) / Shift Amount) + 1
    return Math.ceil((totalItems - itemsPerPage) / SHIFT_AMOUNT) + 1;
  }, [game?.categories?.length, itemsPerPage]);

  const getItemsPerPage = () => {
    // ... (Existing logic for itemsPerPage remains the same)
    if (typeof window === "undefined") return 2;
    const width = window.innerWidth;
    if (width < 320) return 2;
    if (width < 640) return 4;
    if (width < 768) return 4;
    if (width < 1024) return 6;
    if (width < 1280) return 6;
    return 6;
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(0);
    };

    window.addEventListener("resize", handleResize);
    setItemsPerPage(getItemsPerPage());

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleQuestionClick = (questionId: string) => {
    // ... (Existing logic remains the same)
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
  }; // --- Updated Navigation Handlers (Use totalPages from useMemo) ---

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="p-3 flex flex-col justify-around h-full my-auto sm:px-10">
        <CategoryGrid
          categories={game?.categories || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          shiftAmount={SHIFT_AMOUNT}
          onQuestionClick={handleQuestionClick}
          game={game}
        />

        <NavigationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={prevPage}
          onNext={nextPage}
        />
      </div>

      <div className="p-2 py-1 lg:py-3 xl:py-5 bg-light-purple w-full flex justify-center items-center h-fit sm:px-10">
        <div className="w-1/2 sm:w-2/5 px-2 flex gap-2 justify-center items-center flex-col sm:flex-row border-l-[2px] border-primary sm:border-none">
          <TeamScoreCard
            teamName={game?.teamOneName || "Team 1"}
            teamNumber={1}
          />

          <div className="w-full sm:w-2/3">
            <AssistanceBox team={1} context="gameboard" />
          </div>
        </div>
        <SponsorsAds />
        <div className="w-1/2 sm:w-2/5 px-2 flex gap-2 justify-center items-center flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-2/3">
            <AssistanceBox team={2} context="gameboard" />
          </div>

          <TeamScoreCard
            teamName={game?.teamTwoName || "Team 2"}
            teamNumber={2}
          />
        </div>
      </div>
    </>
  );
}
