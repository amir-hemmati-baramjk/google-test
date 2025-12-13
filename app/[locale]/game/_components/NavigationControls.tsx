// components/NavigationControls.tsx
"use client";
import React from "react";

import { useTranslations } from "next-intl";
import { Button } from "../../_components/button/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

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
  const t = useTranslations("GamePage.gameboard.navigation");

  return (
    <div className={`flex justify-center items-center gap-4 mt-2 ${className}`}>
      <Button
        className="!p-1.5 w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 !rounded-[5px]"
        size="small"
        variant="primary"
        shape="square"
        onClick={onPrev}
        disabled={currentPage === 0}
      >
        <ArrowLeftIcon />
      </Button>

      <p className="text-gray-700">
        {t("page")} {currentPage + 1} {t("of")} {totalPages}
      </p>

      <Button
        className="!p-1.5 w-8 h-8 sm:w-7 sm:h-7 lg:w-8 lg:h-8 !rounded-[5px]"
        size="small"
        variant="primary"
        shape="square"
        onClick={onNext}
        disabled={currentPage >= totalPages - 1}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
