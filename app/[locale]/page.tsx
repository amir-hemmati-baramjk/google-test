"use client";
import { useQuery } from "@tanstack/react-query";
import BackHeaderForRootPages from "./_components/backHeader/backHeaderForRootPages";
import BottomDoc from "./_components/bottomDoc/BottomDoc";
import AboutUsBanner from "./_components/homePage/aboutUsBanner/AboutUsBanner";
import ActionCard from "./_components/homePage/actionCard/ActionCard";
import Banner from "./_components/homePage/banner/Banner";
import { getUserProfile } from "@/core/user/user-profile-service";
import { useUser } from "@/stores/userContext";
import { useEffect } from "react";
import { User } from "@/type/api/user/user.type";

export default function Home() {
  const { user, isInitialized, isLogin, setUser } = useUser();
  const {
    data: profileResponse,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    enabled: Boolean(isInitialized && isLogin),
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (profileResponse?.success && profileResponse?.data) {
      setUser(profileResponse.data);
    }
  }, [profileResponse]);
  return (
    <div className="bg-main-bg  pb-24">
      <BackHeaderForRootPages />
      <div className="p-5">
        <Banner />
        <ActionCard />
        <AboutUsBanner />
      </div>
    </div>
  );
}
