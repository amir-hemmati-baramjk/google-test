"use client";
import { Category } from "@/type/api/game/game.type";
import React, { useMemo } from "react";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  currentPage: number;
  itemsPerPage: number; // e.g., 6 (Total cards visible)
  shiftAmount: number; // e.g., 2 (Cards to shift by)
  onQuestionClick: (questionId: string) => void;
  game: any;
}

export default function CategoryGrid({
  categories,
  currentPage,
  itemsPerPage,
  shiftAmount, // <-- NEW PROP
  onQuestionClick,
  game,
}: CategoryGridProps) {
  // Calculate the STARTING index based on the SHIFT amount
  const startIndex = currentPage * shiftAmount;

  // Calculate the ENDING index by adding itemsPerPage to the start index
  const endIndex = startIndex + itemsPerPage;

  // Slice the categories array to get the current window of items
  const currentCategories = categories.slice(startIndex, endIndex);

  // Fill empty slots for consistent grid layout
  const emptyItemsCount = itemsPerPage - currentCategories.length;
  const displayCategories = useMemo(() => {
    return [
      ...currentCategories,
      // Only add null placeholders if we are at the end of the list
      ...Array(
        emptyItemsCount > 0 && endIndex >= categories.length
          ? emptyItemsCount
          : 0
      ).fill(null),
    ];
  }, [currentCategories, emptyItemsCount, categories.length, endIndex]);

  // --- Check for the desired behavior ---
  /*
  If categories.length = 8, itemsPerPage = 6, shiftAmount = 2
  - Page 0: startIndex = 0, endIndex = 6. Items [0, 1, 2, 3, 4, 5]
  - Page 1: startIndex = 2, endIndex = 8. Items [2, 3, 4, 5, 6, 7]
  - Page 2: (If totalPages logic in parent is correct, this page is disabled)
  */

  return (
    <div className="overflow-hidden">
      <div
        key={currentPage}
        className={`
          grid gap-3 my-auto transition-transform duration-500 ease-in-out
          grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6
          animate-slide-in
        `}
      >
        {displayCategories.map((category, index) => (
          <CategoryCard
            key={category?.id || `empty-${startIndex + index}`} // Use absolute index for stable keys
            category={category}
            game={game}
            onQuestionClick={onQuestionClick}
          />
        ))}
      </div>
    </div>
  );
}
