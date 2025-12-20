"use client";

import { usePathname } from "next/navigation";
import NavigationMenu from "./_components/navigationMenu/NavigationMenu";
import BottomDoc from "./_components/bottomDoc/BottomDoc";
import { UserProvider } from "@/stores/userContext";
import { getUserProfile } from "@/core/user/user-profile-service";
import { useQuery } from "@tanstack/react-query";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  locale: string;
}

export default function ClientLayoutWrapper({
  children,
  locale,
}: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const visibleRoutes = [
    "/",
    "/profile",
    "/plans",
    "/tournament",
    "/tournament/joined",
    "/tournament/leaderboard",
  ];
  const pathWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.slice(`/${locale}`.length) || "/"
    : pathname;
  const showNavigation = visibleRoutes.includes(pathWithoutLocale);

  return (
    <>
      <UserProvider>
        {showNavigation && <NavigationMenu />}
        {children}
        {showNavigation && <BottomDoc />}
      </UserProvider>
    </>
  );
}
