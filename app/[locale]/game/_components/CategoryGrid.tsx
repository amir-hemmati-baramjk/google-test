"use client";
import { Category } from "@/type/api/game/game.type";
import React from "react";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  currentPage: number;
  itemsPerPage: number;
  onQuestionClick: (questionId: string) => void;
  game: any; // Replace with proper type
}

export default function CategoryGrid({
  categories,
  currentPage,
  itemsPerPage,
  onQuestionClick,
  game,
}: CategoryGridProps) {
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const emptyItemsCount = itemsPerPage - currentCategories.length;
  const displayCategories = [
    ...currentCategories,
    ...Array(emptyItemsCount > 0 ? emptyItemsCount : 0).fill(null),
  ];

  return (
    <div
      className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-3 my-auto`}
    >
      {displayCategories.map((category, index) => (
        <CategoryCard
          key={category?.id || `empty-${index}`}
          category={category}
          game={game}
          onQuestionClick={onQuestionClick}
        />
      ))}
    </div>
  );
}
