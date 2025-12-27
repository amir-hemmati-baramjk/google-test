"use client";

import React from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { HomeIcon } from "../icons/HomeIcon";
import { PackagesIcon } from "../icons/PackagesIcon";
import { TournamentIcon } from "../icons/TournamentIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { Button } from "../button/button";
import { useTranslations } from "next-intl";
import { Variant } from "../../../../type/components/variant.type";

export default function BottomDoc() {
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      name: t("home"),
      href: "/",
      icon: <HomeIcon />,
      variant: "light-purple-gradient",
    },
    ...(process.env.NEXT_PUBLIC_DISABLE_PAYMENT === "true"
      ? []
      : [
          {
            name: t("packages"),
            href: "/plans",
            icon: <PackagesIcon />,
            variant: "orange-gradient",
          },
        ]),
    // {
    //   name: t("tournaments"),
    //   href: "/tournament",
    //   icon: <TournamentIcon />,
    //   requiresLogin: true,
    //   variant: "orange-gradient",
    // },
    {
      name: t("profile"),
      href: "/profile",
      icon: <ProfileIcon />,
      requiresLogin: true,
      variant: "light-blue-gradient",
    },
  ];

  return (
    <div className="px-2 py-5 bg-primary-bg-gradient w-full fixed bottom-0 left-0 right-0 z-50 lg:hidden ">
      <div className=" flex justify-between items-center ">
        <div className="flex justify-center w-full items-center gap-6 ">
          {menuItems.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Button
                key={index}
                onClick={() => router.push(item.href)}
                variant={isActive ? (item.variant as Variant) : "white"}
                animatedIcon
                shape={"rounded"}
                className={`!px-5 !text-[16px] sm:!text-[18px] !gap-1 ${
                  isActive ? "border-[2px] border-white " : ""
                }`}
              >
                {item.icon}
                {isActive && item.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
