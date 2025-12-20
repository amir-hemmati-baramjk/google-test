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

  if (!category) return <div className="opacity-0" />;

  const pointTiers = [200, 400, 600];

  return (
    <div className="w-full h-full p-1">
      <div className="grid h-full grid-cols-[1.6fr_2fr_1.6fr] gap-1 sm:gap-2 items-stretch">
        {/* LEFT BUTTONS COLUMN */}
        <div className="flex flex-col h-full gap-1 sm:gap-2 justify-between">
          {pointTiers.map((points) => {
            const q = category.questions?.find((q: any) => q.points === points);
            return (
              <button
                key={`l-${points}`}
                onClick={() => onQuestionClick(q?.id as string)}
                disabled={
                  q?.isAnswered || (game?.pendingDoublePoint && points !== 600)
                }
                className="flex-1 bg-[#1000C7] text-white font-bold text-[16px] md:text-[16px] xl:text-[32px] rounded-[15px]   transition-transform active:scale-95 disabled:opacity-30"
              >
                {points}
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
            <p className="text-[#6200EE] font-bold text-[12px]  md:text-[12px] lg:text-[18px] xl;text-[22px]  text-center uppercase tracking-tight">
              {category.name}
            </p>
          </div>
        </div>

        {/* RIGHT BUTTONS COLUMN */}
        <div className="flex flex-col gap-1 sm:gap-2 justify-between">
          {pointTiers.map((points) => {
            const questions = category.questions?.filter(
              (q: any) => q.points === points
            );
            const q = questions?.[1] || questions?.[0];
            return (
              <button
                key={`r-${points}`}
                onClick={() => onQuestionClick(q?.id)}
                disabled={
                  q?.isAnswered || (game?.pendingDoublePoint && points !== 600)
                }
                className="flex-1 bg-[#1000C7] text-white font-bold text-[16px]  xl:text-[32px] rounded-[15px]  transition-transform active:scale-95 disabled:opacity-30 py-3 sm:p-2 md:py-1.5 lg:py-2"
              >
                {points}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
