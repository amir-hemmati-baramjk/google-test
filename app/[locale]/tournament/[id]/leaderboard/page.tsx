"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { getTournamentLeaderboard } from "@/core/tournament/get-tournament-leaderboard-service";
import { useTournamentStore } from "@/stores/tournamentStore";
import { LeaderboardIcon } from "../../../_components/icons/LeaderboardIcon";

import LogoMotionLoading from "@/app/[locale]/_components/logoMotionLoading/LogoMotionLoading";
import { TimerCountDown } from "../../_components/CountDownTimer";
import { ChangeQuestionIcon } from "@/app/[locale]/_components/icons/ChangeQuestionIcon";
import { PrizeIcon } from "@/app/[locale]/_components/icons/PrizeIcon";
import { ParticipantsIcon } from "@/app/[locale]/_components/icons/ParticipantsIcon";
import { GameStartIcon } from "@/app/[locale]/_components/icons/GameStartIcon";

export default function LeaderboardPage() {
  const t = useTranslations("tournament");
  const { id } = useParams<{ id: string }>();
  const { ref, inView } = useInView();
  const { tournament } = useTournamentStore();
  const [status, setStatus] = useState<"checking" | "waiting" | "ready">(
    "checking"
  );

  const endTime = useMemo(
    () => (tournament?.endAt ? new Date(tournament.endAt + "Z").getTime() : 0),
    [tournament?.endAt]
  );

  useEffect(() => {
    if (!endTime) return;
    const now = Date.now();
    if (now >= endTime) {
      setStatus("ready");
    } else {
      setStatus("waiting");
      const timeout = setTimeout(() => setStatus("ready"), endTime - now);
      return () => clearTimeout(timeout);
    }
  }, [endTime]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["tournament-leaderboard", id],
      queryFn: ({ pageParam = 0 }) =>
        getTournamentLeaderboard(id, pageParam as number),
      initialPageParam: 0,
      enabled: !!id && status === "ready",
      getNextPageParam: (lastPage, allPages) =>
        lastPage.data?.length === 10 ? allPages.length : undefined,
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.data || []),
      }),
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "checking") {
    return (
      <div className="py-40 flex justify-center">
        <LogoMotionLoading />
      </div>
    );
  }

  const leaderboard = data?.pages || [];
  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <div className="px-3 pb-20 w-full max-w-[500px] m-auto">
      {/* Full Tournament Data Header */}

      {status === "waiting" ? (
        <div className="flex flex-col items-center mt-8 w-full">
          <TimerCountDown
            showTitle={true}
            expiryTimestamp={new Date(endTime)}
            onExpire={() => setStatus("ready")}
          />
          <div className="w-full p-5 bg-light-purple mt-5 rounded-[20px] border-[2px] border-secondary flex flex-col items-center gap-5">
            <Image
              alt="notif"
              width={100}
              height={100}
              src={"/icons/tournament-notif.svg"}
            />
            <p className="font-bold text-xl text-secondary">
              {t("rankingSoon")}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className=" rounded-[24px] shadow-sm p-3 flex flex-col gap-4   w-full mt-4"
          >
            <div className="relative w-full aspect-[16/9] rounded-[18px] overflow-hidden bg-primary/10">
              <Image
                src={
                  tournament?.picture?.downloadUrl ||
                  "/assets/staticImages/default-tournament.png"
                }
                alt={tournament?.name || "Tournament"}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 px-1">
              <h3 className="text-white text-center text-[20px] font-bold mb-1 truncate">
                {tournament?.name}
              </h3>

              <div className="flex flex-col gap-3">
                <StatRow
                  icon={<PrizeIcon size={24} className="text-white" />}
                  label={t("prize")}
                  value={`$${tournament?.prize || "1,000"}`}
                />
                <StatRow
                  icon={<ChangeQuestionIcon size={24} className="text-white" />}
                  label={t("questions")}
                  value={tournament?.questionCount || 0}
                />
                <StatRow
                  icon={<ParticipantsIcon size={24} className="text-white" />}
                  label={t("participants")}
                  value={`${tournament?.participantCount || 0}+`}
                />
                <StatRow
                  icon={<GameStartIcon size={24} className="text-white" />}
                  label={t("gameStart")}
                  value={
                    tournament?.startAt
                      ? new Date(tournament.startAt).toLocaleString("en-GB")
                      : "-"
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <LogoMotionLoading />
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className=" rounded-[24px] shadow-sm p-3 flex flex-col gap-4   w-full mt-4"
              >
                <div className="relative w-full aspect-[16/9] rounded-[18px] overflow-hidden bg-primary/10">
                  <Image
                    src={
                      tournament?.picture?.downloadUrl ||
                      "/assets/staticImages/default-tournament.png"
                    }
                    alt={tournament?.name || "Tournament"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-3 px-1">
                  <h3 className="text-white text-center text-[20px] font-bold mb-1 truncate">
                    {tournament?.name}
                  </h3>

                  <div className="flex flex-col gap-3">
                    <StatRow
                      icon={<PrizeIcon size={24} className="text-white" />}
                      label={t("prize")}
                      value={`$${tournament?.prize || "1,000"}`}
                    />
                    <StatRow
                      icon={
                        <ChangeQuestionIcon size={24} className="text-white" />
                      }
                      label={t("questions")}
                      value={tournament?.questionCount || 0}
                    />
                    <StatRow
                      icon={
                        <ParticipantsIcon size={24} className="text-white" />
                      }
                      label={t("participants")}
                      value={`${tournament?.participantCount || 0}+`}
                    />
                    <StatRow
                      icon={<GameStartIcon size={24} className="text-white" />}
                      label={t("gameStart")}
                      value={
                        tournament?.startAt
                          ? new Date(tournament.startAt).toLocaleString("en-GB")
                          : "-"
                      }
                    />
                  </div>
                </div>
              </motion.div>
              <div className="flex justify-center items-end gap-2 mt-16 mb-10 h-[220px]">
                {topThree[1] && (
                  <PodiumItem
                    item={topThree[1]}
                    rank={2}
                    colorClass="bg-gradient-to-b from-blue-400 to-blue-600"
                    height="75%"
                    delay={0.2}
                  />
                )}
                {topThree[0] && (
                  <PodiumItem
                    item={topThree[0]}
                    rank={1}
                    colorClass="bg-gradient-to-b from-primary/80 to-primary"
                    height="100%"
                    delay={0}
                  />
                )}
                {topThree[2] && (
                  <PodiumItem
                    item={topThree[2]}
                    rank={3}
                    colorClass="bg-gradient-to-b from-orange-400 to-orange-500"
                    height="65%"
                    delay={0.4}
                  />
                )}
              </div>
              <div className="flex flex-col gap-3 mt-14">
                {remaining.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex justify-between items-center bg-white p-3 rounded-[12px] shadow-sm border border-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-[14px] font-bold w-5 text-gray-400">
                        {item.rank}
                      </p>
                      <p className="text-[14px] font-semibold text-primary">
                        {item.user}
                      </p>
                    </div>
                    <div className="bg-primary/5 px-3 py-1 rounded-full text-primary font-bold text-[13px]">
                      {item.seconds?.toFixed(2)}s
                    </div>
                  </motion.div>
                ))}
                <div ref={ref} className="h-10" />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-white font-bold text-[15px]">{label}</span>
      </div>
      <span className="text-white font-bold text-[15px]">{value}</span>
    </div>
  );
}

function PodiumItem({ item, rank, colorClass, height, delay }: any) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: height, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "backOut" }}
      className="relative flex flex-col items-center w-1/3 max-w-[110px] mt-auto"
    >
      <div className="absolute -top-12 w-[64px] h-[64px] rounded-full border-4 border-white shadow-lg overflow-hidden bg-white z-10">
        {item.picture?.downloadUrl && (
          <Image
            src={item.picture.downloadUrl}
            alt="winner"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div
        className={classNames(
          "w-full rounded-[16px] flex flex-col items-center justify-center text-white mt-auto pb-4 shadow-md",
          colorClass,
          "h-full"
        )}
      >
        <span className="text-[36px] font-black">{rank}</span>
        <span className="text-[12px] font-bold bg-black/10 px-2 rounded-full">
          {item.seconds?.toFixed(2)}s
        </span>
      </div>
      <p className="absolute -bottom-10 text-[14px] font-bold text-white text-center truncate w-full">
        {item.user}
      </p>
    </motion.div>
  );
}
