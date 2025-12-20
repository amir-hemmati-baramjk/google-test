"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGameStore } from "@/stores/gameStore";

export default function SponsorsAds() {
  const t = useTranslations("GamePage.gameboard");
  const { layoutType } = useGameStore();
  return (
    <div
      className={`hidden h-full sm:flex p-2 lg:p-5 bg-white rounded-[16px] text-primary flex-col gap-2 justify-center items-center ${
        layoutType === "version1" ? "w-full" : "w-1/4"
      }`}
    >
      <Image
        alt="falta-logo"
        src="/icons/logo.svg"
        width={35}
        height={35}
        className="lg:w-[60px] lg:h-[60px] xl:w-[75px] xl:h-[75px]"
      />
      <p className="font-bold text-[14px] lg:text-[16px]">{t("sponsorsAds")}</p>
    </div>
  );
}
