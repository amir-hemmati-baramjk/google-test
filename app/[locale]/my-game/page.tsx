"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Banner from "./_components/Banner";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";
import GameCard from "./_components/GameCard";
import { Button } from "../_components/button/button";
import { RefreshCw } from "lucide-react";
import { Game } from "@/type/api/game/game.type";
import { getGameList } from "@/core/game/get-game-list-service";
import { useTranslations } from "next-intl";
import GameCardSkeleton from "./_components/GameCardSkeleton";
import LogoMotionLoading from "../_components/logoMotionLoading/LogoMotionLoading";

const PAGE_SIZE = 12;
export default function GamesPage() {
  const t = useTranslations("GamesPage");

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await getGameList({
        pageIndex: 0,
        pageSize: PAGE_SIZE,
      });

      return {
        ...response,
        pageSize: PAGE_SIZE,
      };
    },
  });

  const games = data?.data || [];
  const totalLoaded = games.length;

  if (isLoading && totalLoaded === 0) {
    return (
      <div className="flex justify-center py-20 w-screen h-screen items-center backdrop-blur-3xl absolute top-0 left-0 z-[1000]">
        <LogoMotionLoading />
      </div>
    );
  }

  if (isError && totalLoaded === 0) {
    return (
      <div className="min-h-screen">
        <BackHeaderForsubPages title={t("myGames")} />
        <Banner />
        <div className="container mx-auto px-5 mt-10">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">
              {error?.message || t("failedToLoad")}
            </p>
            <Button
              onClick={() => refetch()}
              variant="secondary"
              className="flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={20} />
              {t("tryAgain")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <BackHeaderForsubPages title={t("myGames")} />
      <div className="p-5">
        <Banner />
      </div>

      <div className="lg:container px-5 mx-auto mt-10">
        {/* Games Grid */}
        {totalLoaded === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">{t("noGamesFound")}</p>
            <p className="text-gray-400 mt-2">{t("createFirstGame")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 [grid-auto-flow:row]">
            {games.map((game: Game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
