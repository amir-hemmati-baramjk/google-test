"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BackHeaderForRootPages from "../_components/backHeader/backHeaderForRootPages";
import { useUser } from "@/stores/userContext";
import {
  getPlansForGuestUser,
  getPlansForLogedInUser,
} from "@/core/plans/get-plans-list-service";
import { getPackageStyle } from "@/utils/package-mapping";
import GamePackageCard from "./_components/GamePackageCard";
import { GamePackage } from "@/type/api/plans/plans.type";
import { useRouter } from "@/i18n/navigation";
import { Loading } from "../_components/loading/loading";

export default function PackagesPage() {
  const { isLogin, isInitialized } = useUser();
  const router = useRouter();
  const { data: plansResponse, isLoading } = useQuery({
    queryKey: ["plans", isLogin],
    queryFn: isLogin ? getPlansForLogedInUser : getPlansForGuestUser,
    enabled: isInitialized,
  });

  const plansData: GamePackage[] = plansResponse?.data
    ? [...plansResponse.data].sort((a, b) => a.displayOrder - b.displayOrder)
    : [];
  useEffect(() => {
    if (plansResponse?.success && plansResponse.data) {
      console.log("Packages loaded:", plansResponse.data);
    }
  }, [plansResponse]);

  const handleChoosePackage = (planId: string) => {
    router.push(`/checkout/${planId}`);
  };

  return (
    <div className="text-white min-h-screen">
      <BackHeaderForRootPages />
      <div className="lg:container m-auto flex flex-col gap-5 p-4">
        <h1 className="text-lg lg:text-4xl font-bold text-center">
          Game Packages
        </h1>

        <p className="text-center">
          Choose Your Preferred Package, Increase Your Knowledge & Have Fun With
          Us !!
        </p>

        {isLoading && (
          <div className="text-center py-10">
            <Loading variant="light-blue-gradient" size="large" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 pb-20 lg:mt-10">
          {plansData.map((plan) => (
            <GamePackageCard
              key={plan.id}
              plan={plan}
              styles={getPackageStyle(plan?.gPointCount / 100 - 1)}
              onChoosePackage={handleChoosePackage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
