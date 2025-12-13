"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SponsorsAds() {
  const t = useTranslations("GamePage.gameboard");

  return (
    <div className="hidden h-full sm:flex w-1/4 p-5 bg-white rounded-[16px] text-primary flex-col gap-2 justify-center items-center">
      <Image
        alt="falta-logo"
        src="/icons/logo.svg"
        width={40}
        height={40}
        className="lg:w-[60px] lg:h-[60px] xl:w-[75px] xl:h-[75px]"
      />
      <p className="font-bold">{t("sponsorsAds")}</p>
    </div>
  );
}
