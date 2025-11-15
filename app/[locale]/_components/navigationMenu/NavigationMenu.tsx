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
import { Variant } from "../types/variant.type";

export default function NavigationMenu() {
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      name: t("home"),
      href: "/",
      icon: <HomeIcon />,
      variant: "light-blue-gradient",
    },
    ...(process.env.NEXT_PUBLIC_DISABLE_PAYMENT === "true"
      ? []
      : [
          {
            name: t("packages"),
            href: "/plans",
            icon: <PackagesIcon />,
            variant: "light-blue-gradient",
          },
        ]),
    {
      name: t("tournaments"),
      href: "/tournament",
      icon: <TournamentIcon />,
      requiresLogin: true,
      variant: "orange-gradient",
    },
    {
      name: t("profile"),
      href: "/profile",
      icon: <ProfileIcon />,
      requiresLogin: true,
      variant: "light-blue-gradient",
    },
  ];

  return (
    <div className="p-5 bg-primary-bg-gradient">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex justify-center items-center gap-5 text-white">
          <Image
            alt="falta-logo"
            width={80}
            height={80}
            src={"/icons/logo.svg"}
          />
          <div className="flex flex-col gap-1">
            <p className="text-lg font-[700]">Falta</p>
            <p className="text-md font-[300]">Game Platform</p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex justify-center items-center gap-10">
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
                shape="rounded"
              >
                {item.icon}
                {item.name}
              </Button>
            );
          })}
        </div>

        {/* Empty Right Section */}
        <div className="flex justify-center items-center gap-5 text-white w-[120px]"></div>
      </div>
    </div>
  );
}
