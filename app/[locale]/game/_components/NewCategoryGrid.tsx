"use client";
import React, { useMemo } from "react";
import NewCategoryCard from "./NewCategoryCard";
import { Category } from "@/type/api/game/game.type";

export default function NewCategoryGrid({
  categories,
  currentPage,
  itemsPerPage,
  shiftAmount,
  onQuestionClick,
  game,
}: any) {
  const displayCategories = useMemo(() => {
    const total = categories.length;
    const desiredStart = currentPage * shiftAmount;
    const maxStart = Math.max(0, total - itemsPerPage);
    const startIndex = Math.min(desiredStart, maxStart);

    return categories.slice(startIndex, startIndex + itemsPerPage);
  }, [categories, currentPage, itemsPerPage, shiftAmount]);

  return (
    <div className="overflow-hidden w-full px-1">
      <div
        key={currentPage}
        className={`grid gap-4 md:gap-3 lg:gap-5 my-auto transition-all duration-500 ease-in-out animate-slide-in w-full
          ${itemsPerPage <= 3 ? "grid-cols-1" : "grid-cols-2"}`}
      >
        {displayCategories.map((category: Category) => (
          <div
            key={category.id}
            className="flex justify-center items-center w-full h-full"
          >
            <NewCategoryCard
              category={category}
              game={game}
              onQuestionClick={onQuestionClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
