"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Button } from "../../button/button";
import { Variant } from "../../../../../type/components/variant.type";
import { Link } from "@/i18n/routing";

export default function ActionCard() {
  const t = useTranslations("homepage");

  const items = [
    {
      title: t("my-game"),
      buttonText: t("continue"),
      buttonVarient: "primary-bg-gradient",
      icons: "/icons/logo.svg",
      textVarient: "secondary",
      link: "/my-game",
    },
    {
      title: t("choose-categories"),
      buttonText: t("create-game"),
      buttonVarient: "secondary-gradient",
      icons: "/icons/logo.svg",
      textVarient: "secondary",
      link: "/create-game",
    },
    {
      title: t("remaining-games"),
      buttonText: t("buy-games"),
      buttonVarient: "turquoise-gradient",
      key: "GameCount",
      textVarient: "secondary",
      link: "/plans",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full max-w-[1400px] mx-auto mt-5">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="flex bg-white justify-between items-center gap-5 p-3 lg:p-5 rounded-[16px] hover:shadow-lg transition-all active:scale-[0.98] group"
        >
          <div className="flex flex-col gap-3">
            <p
              className={`text-md lg:text-2xl font-[700] text-${item.textVarient}`}
            >
              {item.title}
            </p>

            {item.icons ? (
              <Image
                alt={item.title}
                src={item.icons}
                width={50}
                height={50}
                className="group-hover:scale-110 transition-transform"
              />
            ) : item.key ? (
              <p className="text-5xl lg:text-6xl font-[900] text-turquoise">
                12
              </p>
            ) : (
              <div className="w-[50px] h-[50px]"></div>
            )}
          </div>

          <Button
            className="shadow-custom !text-[14px] pointer-events-none"
            variant={item.buttonVarient as Variant}
          >
            {item.buttonText}
          </Button>
        </Link>
      ))}
    </div>
  );
}
