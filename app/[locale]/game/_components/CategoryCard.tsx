"use client";
import React from "react";
import Image from "next/image";

import { useLocale, useTranslations } from "next-intl";
import { Category, Question } from "@/type/api/game/game.type";

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
  const locale = useLocale();
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
    <div className="w-full  bg-primary-gradient p-2 lg:p-3 xl:p-4 rounded-[20px] lg:rounded-[20px]">
      <div className="relative w-full aspect-square bg-white rounded-[20px] overflow-hidden shadow-sm group ">
        <Image
          alt={category.name || t("emptyCategory")}
          fill
          src={category.picture?.downloadUrl || "/default-image.jpg"}
          className="object-contain "
          priority
        />
      </div>
      <p className="text-center text-md sm:text-xs lg:text-lg xl:text-xl py-1 font-bold">
        {category?.name}
      </p>
      <div className="flex flex-col justify-center gap-1.5 w-full">
        {[200, 400, 600].map((points) => (
          <div
            key={points}
            className="w-full  grid grid-cols-2 text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] font-[600] bg-[#EEE5FD] rounded-[12px] lg:rounded-[20px] overflow-hidden  py-1.5 sm:py-1.5 lg:py-1.5 xl:py-4 "
          >
            {category?.questions
              ?.filter((q: Question) => q?.points === points)
              .map((q: any, qIndex: number) => (
                <button
                  key={q.id}
                  onClick={() => onQuestionClick(q.id)}
                  disabled={
                    q.isAnswered ||
                    (game?.pendingDoublePoint && q.points !== 600) ||
                    (game?.pendingTakePoint && q.points !== 600)
                  }
                  className={`text-center flex font-bold justify-center items-center text-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                    qIndex === 0 && locale == "ar"
                      ? "border-l-secondary border-l-[1px]"
                      : "border-r-secondary border-r-[1px]"
                  } ${
                    q?.answeredBy !== null
                      ? q?.answeredBy == 1
                        ? " !text-secondary"
                        : q?.answeredBy == 2
                        ? "!text-orange-600"
                        : "!text-gray-500 "
                      : ""
                  }`}
                >
                  {game?.pendingDoublePoint && q.points == 600
                    ? q.points * 2
                    : q.points}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
