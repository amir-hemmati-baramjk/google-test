"use client";

import React, { useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { NewGameIcon } from "../_components/icons/NewGameIcon";
import { JoinedIcon } from "../_components/icons/JoinedIcon";
import { LeaderboardIcon } from "../_components/icons/LeaderboardIcon";
import BackHeaderForRootPages from "../_components/backHeader/backHeaderForRootPages";

interface TournamentLayoutProps {
  children: React.ReactNode;
}

export default function TournamentLayout({ children }: TournamentLayoutProps) {
  const t = useTranslations("tournament");
  const pathName = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isActive = (path: string) => {
    if (path === "/tournament") return pathName.endsWith("/tournament");
    return pathName.includes(path);
  };

  const handleNavigate = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="relative">
      <BackHeaderForRootPages />

      {/* Navigation Tabs */}
      <div className="flex flex-col items-center mt-4 px-4">
        <div className="relative flex justify-center gap-2 lg:gap-5 items-center w-full max-w-[600px] p-1.5  rounded-[18px] backdrop-blur-sm shadow-sm overflow-hidden">
          <TabLink
            href="/tournament"
            active={isActive("/tournament")}
            activeColor="bg-light-orange-gradient"
            icon={<NewGameIcon size={40} />}
            isPending={isPending}
            onClick={() => handleNavigate("/tournament")}
          >
            {t("new-Game")}
          </TabLink>

          <TabLink
            href="/tournament/joined"
            active={isActive("/tournament/joined")}
            activeColor="bg-primary-gradient"
            icon={<JoinedIcon size={40} />}
            isPending={isPending}
            onClick={() => handleNavigate("/tournament/joined")}
          >
            {t("joined")}
          </TabLink>

          <TabLink
            href="/tournament/leaderboard"
            active={isActive("/tournament/leaderboard")}
            activeColor="bg-gradient-to-br from-amber-500 to-orange-600"
            icon={<LeaderboardIcon size={40} />}
            isPending={isPending}
            onClick={() => handleNavigate("/tournament/leaderboard")}
          >
            {t("leaderboard")}
          </TabLink>
        </div>
      </div>

      {/* Page Content */}
      <main
        className={`mt-6 transition-all duration-300 ${
          isPending ? "opacity-60 grayscale-[20%]" : "opacity-100"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

interface TabLinkProps {
  href: string;
  active: boolean;
  activeColor: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  isPending: boolean;
  onClick: () => void;
}

function TabLink({
  active,
  activeColor,
  icon,
  children,
  isPending,
  onClick,
}: TabLinkProps) {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className={`
        flex flex-col items-center justify-center gap-1.5
        w-1/3 py-3 rounded-[14px] transition-all duration-300 ease-out
        ${
          active
            ? `${activeColor} text-white shadow-md scale-[1.02] z-10`
            : "bg-white text-primary hover:bg-gray-50"
        }
        ${isPending ? "cursor-wait opacity-80" : "cursor-pointer"}
      `}
    >
      <div className="transition-transform duration-300">
        {React.cloneElement(icon)}
      </div>

      <span className="text-[10px] lg:text-sm font-bold uppercase tracking-tight whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}
