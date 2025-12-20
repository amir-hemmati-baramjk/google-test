"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../../button/button";
import { Variant } from "../../../../../type/components/variant.type";
import { Link } from "@/i18n/routing";
import { useUser } from "@/stores/userContext";
import LoginModal from "@/app/[locale]/create-game/_components/LoginModal";

export default function ActionCard() {
  const t = useTranslations("homepage");
  const { user } = useUser();
  const isLoggedIn = !!user;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const items = [
    {
      title: t("my-game"),
      buttonText: t("continue"),
      buttonVarient: "primary-bg-gradient",
      icons: "/icons/logo.svg",
      textVarient: "secondary",
      link: "/my-game",
      requiresAuth: true,
    },
    {
      title: t("choose-categories"),
      buttonText: t("create-game"),
      buttonVarient: "secondary-gradient",
      icons: "/icons/logo.svg",
      textVarient: "secondary",
      link: "/create-game",
      requiresAuth: false,
    },
    {
      title: t("remaining-games"),
      buttonText: t("buy-games"),
      buttonVarient: "turquoise-gradient",
      key: "GameCount",
      textVarient: "secondary",
      link: "/plans",
      requiresAuth: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full max-w-[1400px] mx-auto mt-5  lg:px-0">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex bg-white justify-between items-center gap-5 p-4 lg:p-6 rounded-[16px] shadow-sm group"
        >
          <div className="flex flex-col gap-3">
            <p
              className={`text-md lg:text-2xl font-[700] text-${item.textVarient}`}
            >
              {item.title}
            </p>

            {item.icons ? (
              <div className="relative w-[50px] h-[50px]">
                <Image
                  alt={item.title}
                  src={item.icons}
                  fill
                  className="object-contain"
                />
              </div>
            ) : item.key ? (
              <p className="text-5xl lg:text-6xl font-[900] text-turquoise">
                12
              </p>
            ) : (
              <div className="w-[50px] h-[50px]"></div>
            )}
          </div>

          {/* Only the button is clickable */}
          {item.requiresAuth && !isLoggedIn ? (
            <Button
              onClick={() => setShowLoginModal(true)}
              className="shadow-custom "
              variant={item.buttonVarient as Variant}
              size="large"
            >
              {item.buttonText}
            </Button>
          ) : (
            <Link href={item.link}>
              <Button
                className="shadow-custom  "
                variant={item.buttonVarient as Variant}
                size="large"
              >
                {item.buttonText}
              </Button>
            </Link>
          )}
        </div>
      ))}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
