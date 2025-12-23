"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/app/[locale]/_components/button/button";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import { ArrowLeftIcon } from "../../_components/icons/ArrowLeftIcon";

interface NavigationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export default function NavigationControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  className = "",
}: NavigationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex items-center justify-center gap-6 py-1 lg:py-4 ${className}`}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="secondary"
          isOutline
          onClick={onPrev}
          disabled={currentPage === 0}
          className="!p-[2px] !min-w-fit disabled:opacity-30 flex items-center justify-center !rounded-lg"
        >
          <ArrowLeftIcon className="rotate-180" />
        </Button>
      </motion.div>

      <div className="flex gap-2 items-center">
        {Array.from({ length: totalPages }).map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              width: currentPage === i ? 24 : 8,
              backgroundColor: currentPage === i ? "#9333ea" : "#9ca3af",
              opacity: currentPage === i ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-2 rounded-full cursor-pointer"
            onClick={() => {
              if (i > currentPage) onNext();
              if (i < currentPage) onPrev();
            }}
          />
        ))}
      </div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="secondary"
          isOutline
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className="!p-[2px] !min-w-fit disabled:opacity-30 flex items-center justify-center !rounded-lg"
        >
          <ArrowLeftIcon />
        </Button>
      </motion.div>
    </div>
  );
}
