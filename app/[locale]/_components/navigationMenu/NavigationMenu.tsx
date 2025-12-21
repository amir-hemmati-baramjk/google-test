"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { HomeIcon } from "../icons/HomeIcon";
import { PackagesIcon } from "../icons/PackagesIcon";
import { TournamentIcon } from "../icons/TournamentIcon";
import { ProfileIcon } from "../icons/ProfileIcon";
import { Button } from "../button/button";
import { useTranslations } from "next-intl";
import { Variant } from "../../../../type/components/variant.type";

export default function NavigationMenu() {
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 450);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    // {
    //   name: t("tournaments"),
    //   href: "/tournament",
    //   icon: <TournamentIcon />,
    //   variant: "orange-gradient",
    // },
    {
      name: t("profile"),
      href: "/profile",
      icon: <ProfileIcon />,
      variant: "light-blue-gradient",
    },
  ];

  return (
    <div
      className={`w-full hidden lg:block bg-primary-bg-gradient sticky top-0 left-0 right-0 z-50 shadow-lg translate-y-0 opacity-100`}
    >
      <div className="container mx-auto flex justify-between items-center p-5">
        {/* Logo */}
        <div className="flex justify-center items-center gap-5 text-white">
          <Image
            alt="falta-logo"
            width={80}
            height={80}
            src={"/icons/logo.svg"}
          />
          <div className="flex flex-col gap-1">
            <p className="text-2xl xl:text-4xl font-bold">Falta</p>
            <p className="text-lg font-[300]">Game Platform</p>
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
                className="text-xl xl:!text-2xl !font-bold !whitespace-nowrap"
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
