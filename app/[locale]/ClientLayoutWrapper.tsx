"use client";

import { usePathname } from "next/navigation";
import NavigationMenu from "./_components/navigationMenu/NavigationMenu";
import BottomDoc from "./_components/bottomDoc/BottomDoc";
import { UserProvider } from "@/stores/userContext";
import { getUserProfile } from "@/core/user/user-profile-service";
import { useQuery } from "@tanstack/react-query";
import "../toast-custom.css";
import Footer from "./_components/footer/Footer";
import { useEffect } from "react";
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

  // TODO
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     window.addEventListener("load", () => {
  //       navigator.serviceWorker.register("/sw.js").then(
  //         (reg) => console.log("SW registered"),
  //         (err) => console.log("SW failed", err)
  //       );
  //     });
  //   }
  // }, []);

  return (
    <>
      <UserProvider>
        {showNavigation && <NavigationMenu />}
        <div className="flex-1">{children}</div>
        {showNavigation && <BottomDoc />}
        <Footer />
      </UserProvider>
    </>
  );
}
