"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Image from "next/image";
import classNames from "classnames";
import { getLeaderboard } from "@/core/tournament/get-general-leaderboard-service";
import { Loading } from "../../_components/loading/loading";
import { LeaderboardIcon } from "../../_components/icons/LeaderboardIcon";

export default function LeaderboardPage() {
  const t = useTranslations("tournament");

  const {
    data: leaderboard,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tournament-leaderboard"],
    queryFn: async () => {
      const res = await getLeaderboard();
      if (res.success && res.data) {
        return res.data;
      }
      throw new Error(res.errors?.toString() || t("tournament.fetchError"));
    },
    staleTime: 300000,
  });

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-red-500 font-bold">
          {error instanceof Error ? error.message : t("tournament.fetchError")}
        </p>
      </div>
    );
  }

  const topThree = leaderboard?.slice(0, 3) || [];
  const remaining = leaderboard?.slice(3) || [];

  return (
    <div className="px-3 pb-20 max-w-[500px] m-auto">
      {/* Header Banner */}
      <div className="p-5 bg-white rounded-[10px] text-secondary flex justify-between items-center mt-6 shadow-sm border border-gray-50">
        <LeaderboardIcon className="text-secondary" size={40} />
        <div className="text-right">
          <p className="text-[20px] font-bold text-primary leading-tight">
            {leaderboard?.length || 0}
          </p>
          <p className="text-[12px] opacity-70 uppercase font-bold tracking-wider text-primary">
            {t("participantsCount")}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loading size="large" variant="primary" />
        </div>
      ) : (
        <>
          {/* Podium Section */}
          {topThree.length > 0 && (
            <div className="flex justify-center items-end gap-2 mt-16 mb-10 h-[220px]">
              {/* Rank 2 */}
              {topThree[1] && (
                <PodiumItem
                  item={topThree[1]}
                  rank={2}
                  colorClass="bg-gradient-to-b from-white/0 to-blue-600"
                  height="h-[75%]"
                />
              )}
              {/* Rank 1 */}
              {topThree[0] && (
                <PodiumItem
                  item={topThree[0]}
                  rank={1}
                  colorClass="bg-gradient-to-b from-white/0 to-primary"
                  height="h-[100%]"
                />
              )}
              {/* Rank 3 */}
              {topThree[2] && (
                <PodiumItem
                  item={topThree[2]}
                  rank={3}
                  colorClass="bg-gradient-to-b from-white/0 to-orange-500"
                  height="h-[65%]"
                />
              )}
            </div>
          )}

          {/* List Section */}
          <div className="flex flex-col gap-3 mt-4">
            {remaining.map((item) => (
              <div
                key={`${item.user}-${item.rank}`}
                className="flex justify-between items-center bg-white p-3 rounded-[12px] shadow-sm border border-gray-50 transition-transform active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <p className="text-[14px] font-bold w-5 text-gray-400">
                    {item.rank}
                  </p>
                  <div className="w-[40px] h-[40px] relative overflow-hidden rounded-full border border-gray-100 bg-light-purple">
                    {item.picture?.downloadUrl ? (
                      <Image
                        src={item.picture?.downloadUrl}
                        alt="winner"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-light-purple w-full h-full"></div>
                    )}
                  </div>
                  <p className="text-[14px] font-semibold text-primary truncate max-w-[150px]">
                    {item.user}
                  </p>
                </div>
                {/* <div className="bg-primary/5 px-3 py-1 rounded-full">
                  <p className="text-primary font-bold text-[13px]">
                    {item.seconds.toFixed(2)}s
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        </>
      )}

      {!isLoading && leaderboard?.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[10px] mt-6 text-gray-400 border border-dashed">
          {t("tournament.noTournaments")}
        </div>
      )}
    </div>
  );
}

function PodiumItem({
  item,
  rank,
  colorClass,
  height,
}: {
  item: any;
  rank: number;
  colorClass: string;
  height: string;
}) {
  const t = useTranslations("index");
  return (
    <div
      className={classNames(
        "relative flex flex-col items-center w-1/3 max-w-[110px]",
        height
      )}
    >
      {/* Avatar */}
      <div className="absolute -top-12 w-[64px] h-[64px] rounded-full border-4 border-white shadow-lg overflow-hidden bg-white z-10">
        {item.picture?.downloadUrl ? (
          <Image
            src={item.picture?.downloadUrl}
            alt="winner"
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-light-purple w-full h-full"></div>
        )}
      </div>

      {/* Pillar */}
      <div
        className={classNames(
          "w-full rounded-[16px] flex flex-col items-center justify-center text-white mt-auto pb-4 shadow-md",
          colorClass,
          "h-full"
        )}
      >
        <span className="text-[36px] font-black leading-none">{rank}</span>
        <span className="text-[12px] font-bold mt-1  px-2 py-0.5 rounded-full">
          {item.seconds.toFixed(2)}s
        </span>
      </div>

      {/* Name below pillar */}
      <p className="text-[14px] font-bold text-white mt-3 text-center truncate w-full px-1">
        {item.user || t("tournament.anonymous")}
      </p>
    </div>
  );
}
