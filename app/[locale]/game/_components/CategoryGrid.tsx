"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CategoryCard from "./CategoryCard";
import { Category } from "@/type/api/game/game.type";
import NavigationControls from "./NavigationControls";

export default function CategoryGrid({
  categories,
  currentPage,
  handlePageChange,
  onQuestionClick,
  game,
  itemsPerPage: initialItemsPerPage = 4,
  shiftAmount: initialShiftAmount = 4,
}: any) {
  const [layoutConfig, setLayoutConfig] = useState({
    items: initialItemsPerPage,
    shift: initialShiftAmount,
  });
  const { shift } = layoutConfig;

  const totalPages = useMemo(() => {
    if (!categories || categories.length === 0) return 0;
    return Math.ceil(categories.length / shift);
  }, [categories, shift]);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile
        setLayoutConfig({ items: 2, shift: 2 });
      } else if (width < 768) {
        // SM
        setLayoutConfig({ items: 2, shift: 2 });
      } else if (width < 1024) {
        // MD
        setLayoutConfig({ items: 4, shift: 4 });
      } else {
        // LG and up
        setLayoutConfig({ items: 5, shift: 5 });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const { items: currentItemsPerPage, shift: currentShiftAmount } =
    layoutConfig;

  const displayCategories = useMemo(() => {
    const allCats = categories || [];
    const startIndex = currentPage * currentShiftAmount;
    const sliced = allCats.slice(startIndex, startIndex + currentItemsPerPage);

    const padded = [...sliced];
    while (padded.length < currentItemsPerPage) {
      padded.push(null);
    }
    return padded;
  }, [categories, currentPage, currentItemsPerPage, currentShiftAmount]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <div className="mt-5 perspective-1000 mb-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPage}-${currentItemsPerPage}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`grid gap-1 lg:gap-3 my-auto w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5`}
        >
          {displayCategories.map((category: Category | null, index: number) => (
            <motion.div
              key={`page-${currentPage}-slot-${index}`}
              variants={cardVariants}
              className="w-full h-full"
            >
              <CategoryCard
                category={category}
                game={game}
                onQuestionClick={onQuestionClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
