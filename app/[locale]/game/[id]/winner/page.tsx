"use client";
import { Button } from "@/app/[locale]/_components/button/button";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "@/i18n/navigation";

export default function WinnerPage() {
  const t = useTranslations("WinnerPage");
  const router = useRouter();

  const teamOneName = useGameStore((state) => state.teamOneName);
  const teamOnePoints = useGameStore((state) => state.teamOnePoints);
  const teamTwoName = useGameStore((state) => state.teamTwoName);
  const teamTwoPoints = useGameStore((state) => state.teamTwoPoints);

  const outcome = useMemo(() => {
    if (teamOnePoints > teamTwoPoints) {
      return {
        winner: {
          name: teamOneName,
          points: teamOnePoints,
        },
        loser: {
          name: teamTwoName,
          points: teamTwoPoints,
        },
        isTie: false,
        winnerTeam: 1,
      };
    } else if (teamTwoPoints > teamOnePoints) {
      return {
        winner: {
          name: teamTwoName,
          points: teamTwoPoints,
        },
        loser: {
          name: teamOneName,
          points: teamOnePoints,
        },
        isTie: false,
        winnerTeam: 2,
      };
    } else {
      return {
        winner: {
          name: teamOneName,
          points: teamOnePoints,
        },
        loser: {
          name: teamTwoName,
          points: teamTwoPoints,
        },
        isTie: true,
        winnerTeam: null,
      };
    }
  }, [teamOneName, teamOnePoints, teamTwoName, teamTwoPoints]);

  const renderContent = () => {
    if (outcome.isTie) {
      return (
        <>
          <div className="flex-col justify-center items-center gap-5 flex sm:hidden">
            <p className="font-bol text-white text-3xl font-bold lg:text-4xl">
              {t("tieGame")}
            </p>
            <p className="font-bol text-white text-2xl font-bold lg:text-2xl">
              {t("bothTeamsScored", { points: outcome.winner.points })}
            </p>
          </div>

          <div className="flex justify-between lg:justify-around items-center gap-5 w-full">
            <div className="bg-white p-3 flex flex-col gap-3 rounded-[10px] border-4 border-yellow-500">
              <div className="py-1 px-3 md:py-5 md:px-10 w-full bg-yellow-500/20 rounded-[10px]">
                <Image
                  alt={t("tieTeam")}
                  width={100}
                  height={100}
                  src={"/staticImages/winner.png"}
                />
              </div>
              <p className="text-yellow-600 text-xl text-center">
                {teamOneName}
              </p>
              <p className="text-yellow-600 text-lg text-center">
                {teamOnePoints} {t("points")}
              </p>
            </div>

            <div className="hidden sm:block"></div>

            <div className="bg-white p-3 flex flex-col gap-3 rounded-[10px] border-4 border-yellow-500">
              <div className="py-1 px-3 md:py-5 md:px-10 w-full bg-yellow-500/20 rounded-[10px]">
                <Image
                  alt={t("tieTeam")}
                  width={100}
                  height={100}
                  src={"/staticImages/winner.png"}
                />
              </div>
              <p className="text-yellow-600 text-xl text-center">
                {teamTwoName}
              </p>
              <p className="text-yellow-600 text-lg text-center">
                {teamTwoPoints} {t("points")}
              </p>
            </div>
          </div>
        </>
      );
    }

    const winnerTeam = outcome.winnerTeam === 1 ? teamOneName : teamTwoName;

    return (
      <>
        <div className="flex-col justify-center items-center gap-5 flex sm:hidden">
          <p className="font-bol text-white text-3xl font-bold lg:text-4xl">
            {t("congratulations")}
          </p>
          <p className="font-bol text-white text-2xl font-bold lg:text-2xl">
            {t("onYourVictory")}
          </p>
          <p className="font-bol text-white text-3xl font-bold lg:text-4xl">
            {winnerTeam} {t("winner")}!
          </p>
        </div>

        <div className="flex justify-between lg:justify-around items-center gap-5 w-full">
          <div
            className={`bg-white p-3 flex flex-col gap-3 rounded-[10px] ${
              outcome.winnerTeam === 1
                ? "border-4 border-primary"
                : "border-4 border-error"
            }`}
          >
            <div
              className={`py-1 px-3 md:py-5 md:px-10 w-full ${
                outcome.winnerTeam === 1 ? "bg-primary/20" : "bg-error/20"
              } rounded-[10px]`}
            >
              <Image
                alt={
                  outcome.winnerTeam === 1 ? t("winningTeam") : t("losingTeam")
                }
                width={100}
                height={100}
                src={
                  outcome.winnerTeam === 1
                    ? "/staticImages/winner.png"
                    : "/staticImages/lose.png"
                }
              />
            </div>
            <p
              className={`${
                outcome.winnerTeam === 1 ? "text-primary" : "text-error"
              } text-xl text-center`}
            >
              {teamOneName}
            </p>
            <p
              className={`${
                outcome.winnerTeam === 1 ? "text-primary" : "text-error"
              } text-lg text-center`}
            >
              {teamOnePoints} {t("points")}
            </p>
          </div>

          <div className="flex-col justify-center items-center gap-5 hidden sm:flex">
            <p className="font-bol text-white text-2xl font-bold lg:text-4xl">
              {t("congratulations")}
            </p>
            <p className="font-bol text-white text-xl font-bold lg:text-2xl">
              {t("onYourVictory")}
            </p>
            <p className="font-bol text-white text-2xl font-bold lg:text-4xl">
              {winnerTeam} {t("winner")}!
            </p>
          </div>

          <div
            className={`bg-white p-3 flex flex-col gap-3 rounded-[10px] ${
              outcome.winnerTeam === 2
                ? "border-4 border-primary"
                : "border-4 border-error"
            }`}
          >
            <div
              className={`py-1 px-3 md:py-5 md:px-10 w-full ${
                outcome.winnerTeam === 2 ? "bg-primary/20" : "bg-error/20"
              } rounded-[10px]`}
            >
              <Image
                alt={
                  outcome.winnerTeam === 2 ? t("winningTeam") : t("losingTeam")
                }
                width={100}
                height={100}
                src={
                  outcome.winnerTeam === 2
                    ? "/staticImages/winner.png"
                    : "/staticImages/lose.png"
                }
              />
            </div>
            <p
              className={`${
                outcome.winnerTeam === 2 ? "text-primary" : "text-error"
              } text-xl text-center`}
            >
              {teamTwoName}
            </p>
            <p
              className={`${
                outcome.winnerTeam === 2 ? "text-primary" : "text-error"
              } text-lg text-center`}
            >
              {teamTwoPoints} {t("points")}
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-5 sm:p-0 sm:container sm:m-auto flex flex-col justify-center items-center gap-5 lg:gap-10 w-full h-full ">
      {renderContent()}
      <Button
        onClick={() => router.replace("/")}
        size="large"
        variant="secondary"
      >
        {t("backToHomePage")}
      </Button>
    </div>
  );
}
