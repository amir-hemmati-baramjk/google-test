"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LogoMotionLoading from "@/app/[locale]/_components/logoMotionLoading/LogoMotionLoading";

const LoadingContext = createContext({
  setIsLoading: (value: boolean) => {},
});

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && <LogoMotionLoading />}
      {children}
    </LoadingContext.Provider>
  );
}
