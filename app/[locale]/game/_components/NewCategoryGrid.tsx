"use client";
import React, { useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Added Framer Motion
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      rotateX: 45,
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
    <div className="overflow-hidden w-full h-full flex justify-center items-center px-1 perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage} // Trigger animation on page change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`grid gap-4 md:gap-3 lg:gap-5 my-auto w-full
            ${itemsPerPage <= 3 ? "grid-cols-1" : "grid-cols-2"}`}
        >
          {displayCategories.map((category: Category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              // whileHover={{ scale: 1.05, zIndex: 10 }}
              // whileTap={{ scale: 0.95 }}
              className="flex justify-center items-center w-full h-full"
            >
              <NewCategoryCard
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
