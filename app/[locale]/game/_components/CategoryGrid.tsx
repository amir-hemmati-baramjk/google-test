"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
    const allCats = categories || [];
    const total = allCats.length;

    const desiredStart = currentPage * shiftAmount;
    const maxStart = Math.max(0, total - itemsPerPage);
    const startIndex = Math.min(desiredStart, maxStart);

    const sliced = allCats.slice(startIndex, startIndex + itemsPerPage);

    const padded = [...sliced];
    while (padded.length < itemsPerPage) {
      padded.push(null);
    }
    return padded;
  }, [categories, currentPage, itemsPerPage, shiftAmount]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="mt-5 perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`grid gap-1 lg:gap-3 my-auto w-full
            grid-cols-1 xs:grid-cols-2 
            ${
              itemsPerPage === 4
                ? "sm:grid-cols-2 md:grid-cols-4"
                : "sm:grid-cols-4 md:grid-cols-6"
            }`}
        >
          {displayCategories.map((category: Category | null, index: number) => (
            <motion.div
              key={category?.id || `empty-${index}`}
              variants={cardVariants}
              // whileHover={category ? { scale: 1.03, y: -5, zIndex: 10 } : {}}
              // whileTap={category ? { scale: 0.98 } : {}}
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
