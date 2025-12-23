"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
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
import LogoMotionLoading from "../_components/logoMotionLoading/LogoMotionLoading";

export default function PackagesPage() {
  const t = useTranslations("plans");
  const { isLogin, isInitialized } = useUser();
  const router = useRouter();

  const {
    data: plansResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plans", isLogin],
    queryFn: isLogin ? getPlansForLogedInUser : getPlansForGuestUser,
    enabled: isInitialized,
  });

  const plansData: GamePackage[] = plansResponse?.data
    ? [...plansResponse.data].sort((a, b) => a.displayOrder - b.displayOrder)
    : [];

  const handleChoosePackage = (planId: string) => {
    router.push(`/checkout/${planId}`);
  };

  return (
    <div className="text-white min-h-screen">
      <BackHeaderForRootPages />

      <div className=" m-auto flex flex-col gap-5 p-4 max-w-[1400px]">
        <div className="space-y-2 lg:space-y-10 mt-4">
          <h1 className="text-3xl lg:text-6xl font-bold text-center">
            {t("title")}
          </h1>
          <p className="text-lg font-bold lg:text-2xl opacity-90 text-center">
            {t("description")}
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-20 w-screen h-screen items-center backdrop-blur-3xl absolute top-0 left-0 z-[1000]">
            <LogoMotionLoading />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-400 font-bold">
            {t("fetchError")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pb-20 lg:mt-10">
            {plansData.map((plan) => (
              <GamePackageCard
                key={plan.id}
                plan={plan}
                styles={getPackageStyle(plan?.gPointCount / 100 - 1)}
                onChoosePackage={handleChoosePackage}
              />
            ))}

            {/* Empty State */}
            {!isLoading && plansData.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-[15px] border border-dashed text-secondary">
                {t("noPlans")}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
