"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
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

  if (!category) return <div className="opacity-0" />;

  const pointTiers = [200, 400, 600];

  return (
    <div className="w-full h-full p-1">
      <div className="grid h-full grid-cols-[1.6fr_2fr_1.6fr] gap-1 sm:gap-2 items-stretch">
        {/* LEFT BUTTONS COLUMN */}
        <div className="flex flex-col h-full gap-1 sm:gap-2 justify-between">
          {pointTiers.map((points) => {
            const q = category.questions?.find(
              (q: Question) => q.points === points,
            );
            return (
              <button
                key={`l-${points}`}
                onClick={() => onQuestionClick(q?.id as string)}
                disabled={
                  q?.isAnswered || (game?.pendingDoublePoint && points !== 600)
                }
                className={`flex-1text-white font-bold text-[28px] xl:text-[32px] rounded-[15px] transition-transform active:scale-95 disabled:opacity-80 py-3 sm:p-2 md:py-1.5 lg:py-2 ${
                  q?.answeredBy !== null
                    ? q?.answeredBy == 1
                      ? "!bg-primary-gradient"
                      : q?.answeredBy == 2
                        ? "!bg-orange-gradient"
                        : q?.answeredBy == 0
                          ? "!bg-gray-500"
                          : ""
                    : "bg-[#1000C7]"
                }`}
              >
                {game?.pendingDoublePoint && points == 600
                  ? points * 2
                  : points}
              </button>
            );
          })}
        </div>

        {/* CENTER IMAGE CONTAINER */}
        <div className="py-5 h-full relative">
          <div className="bg-white z-10 flex flex-col  items-center justify-between p-2 lg:p-4 h-[90%] rounded-[16px] absolute left-1/2 translate-x-[-50%] translate-y-[-50%] top-1/2 w-[130%]">
            <div className=" w-full flex-1  h-full relative">
              <Image
                alt={category.name || "category"}
                fill
                src={category.picture?.downloadUrl || "/default-image.jpg"}
                className="object-contain "
                priority
              />
            </div>
            {/* Label text at the bottom */}
            <p className="text-[#6200EE] font-bold text-[18px]  md:text-[20px] lg:text-[22px] xl;text-[22px]  text-center uppercase tracking-tight">
              {category.name}
            </p>
          </div>
        </div>

        {/* RIGHT BUTTONS COLUMN */}
        <div className="flex flex-col gap-1 sm:gap-2 justify-between ">
          {pointTiers.map((points) => {
            const questions = category.questions?.filter(
              (q: any) => q.points === points,
            );
            const q = questions?.[1] || questions?.[0];
            return (
              <button
                key={`r-${points}`}
                onClick={() => onQuestionClick(q?.id)}
                disabled={
                  q?.isAnswered || (game?.pendingDoublePoint && points !== 600)
                }
                className={`flex-1 bg-[#1000C7] text-white font-bold text-[28px] xl:text-[32px] rounded-[15px]  transition-transform active:scale-95 disabled:opacity-80 py-3 sm:p-2 md:py-1.5 lg:py-2 ${
                  q?.answeredBy !== null
                    ? q?.answeredBy == 1
                      ? "!bg-primary-gradient"
                      : q?.answeredBy == 2
                        ? "!bg-orange-gradient"
                        : q?.answeredBy == 0
                          ? "!bg-gray-500"
                          : ""
                    : "bg-[#1000C7]"
                }`}
              >
                {game?.pendingDoublePoint && points == 600
                  ? points * 2
                  : points}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
