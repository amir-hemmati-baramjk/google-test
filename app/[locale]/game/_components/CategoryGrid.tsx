"use client";
import React, { useMemo } from "react";
import CategoryCard from "./CategoryCard";
import { Category } from "@/type/api/game/game.type";

export default function CategoryGrid({
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
    <div className="overflow-hidden">
      <div
        key={currentPage}
        className={`grid gap-3 my-auto transition-transform duration-500 ease-in-out animate-slide-in
          grid-cols-1 xs:grid-cols-2 
          ${
            itemsPerPage === 4
              ? "sm:grid-cols-2 md:grid-cols-4"
              : "sm:grid-cols-4 md:grid-cols-6"
          }`}
      >
        {displayCategories.map((category: Category) => (
          <CategoryCard
            key={category.id}
            category={category}
            game={game}
            onQuestionClick={onQuestionClick}
          />
        ))}
      </div>
    </div>
  );
}
