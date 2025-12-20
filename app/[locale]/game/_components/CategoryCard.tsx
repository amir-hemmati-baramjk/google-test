"use client";
import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { Category } from "@/type/api/game/game.type";

interface CategoryCardProps {
  category: Category | null;
  game: any;
  onQuestionClick: (questionId: string) => void;
}

export default function CategoryCard({
  category,
  game,
  onQuestionClick,
}: CategoryCardProps) {
  const t = useTranslations("GamePage.gameboard");

  if (!category) {
    return (
      <div className="w-full bg-primary-gradient p-1 lg:p-2 xl:p-3 rounded-[10px] opacity-0 pointer-events-none">
        <div className="hidden">
          <div className="bg-white rounded-[10px] h-[150px]"></div>
          <div className="flex flex-col justify-center gap-1 py-2 w-full">
            {[200, 400, 600].map((points) => (
              <div
                key={points}
                className="w-full py-2 grid grid-cols-2 text-sm lg:text-lg xl:text-xl 2xl:text-2xl bg-[#EEE5FD] font-bold rounded-[12px]"
              >
                <div className="text-center flex justify-center items-center text-primary border-r-primary border-r-[1px]">
                  {points}
                </div>
                <div className="text-center flex justify-center items-center text-primary">
                  {points}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-primary-gradient p-1 lg:p-2 xl:p-3 rounded-[10px]">
      <div className="bg-white flex justify-center items-center rounded-[10px]">
        <Image
          alt={category.name || t("emptyCategory")}
          width={200}
          height={200}
          src={category.picture?.downloadUrl || "/default-image.jpg"}
          className="w-full sm:w-[70%] lg:w-full h-auto object-cover transition-opacity duration-300"
        />
      </div>
      <div className="flex flex-col justify-center gap-1 py-2 w-full">
        {[200, 400, 600].map((points) => (
          <div
            key={points}
            className="w-full py-1.5 xl:py-2.5 grid grid-cols-2 text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] font-[600] bg-[#EEE5FD] rounded-[12px]"
          >
            {category?.questions
              ?.filter((q: any) => q?.points === points)
              .map((q: any, qIndex: number) => (
                <button
                  key={q.id}
                  onClick={() => onQuestionClick(q.id)}
                  disabled={
                    q.isAnswered ||
                    (game?.pendingDoublePoint && q.points !== 600) ||
                    (game?.pendingTakePoint && q.points !== 600)
                  }
                  className={`text-center flex font-bold justify-center items-center text-primary cursor-pointer disabled:text-[#ccc] disabled:cursor-not-allowed ${
                    qIndex === 0 ? "border-r-primary border-r-[1px]" : ""
                  }`}
                >
                  {q.points}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
