"use client";
import { Button } from "@/app/[locale]/_components/button/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useEffect } from "react";
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "@/i18n/navigation";
import { motion, Variants } from "framer-motion";
import confetti from "canvas-confetti";

export default function WinnerPage() {
  const t = useTranslations("WinnerPage");
  const router = useRouter();

  const teamOneName = useGameStore((state) => state.teamOneName);
  const teamOnePoints = useGameStore((state) => state.teamOnePoints);
  const teamTwoName = useGameStore((state) => state.teamTwoName);
  const teamTwoPoints = useGameStore((state) => state.teamTwoPoints);

  useEffect(() => {
    const end = Date.now() + 3 * 1000;
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFD700", "#FFFFFF"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FFD700", "#FFFFFF"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const outcome = useMemo(() => {
    const isTie = teamOnePoints === teamTwoPoints;
    const winnerTeam = teamOnePoints > teamTwoPoints ? 1 : 2;
    const winnerName = winnerTeam === 1 ? teamOneName : teamTwoName;
    return { isTie, winnerTeam, winnerName };
  }, [teamOneName, teamOnePoints, teamTwoName, teamTwoPoints]);

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVars: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center w-full h-full bg-primary overflow-x-hidden ">
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl flex flex-col items-center gap-6 lg:gap-10"
      >
        <motion.div
          variants={itemVars}
          className="text-center space-y-2 px-4 sm:hidden lg:block"
        >
          <p className="text-white text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            {outcome.isTie ? t("tieGame") : t("congratulations")}
          </p>
          <p className="text-white text-xl md:text-2xl font-bold opacity-90">
            {outcome.isTie
              ? t("bothTeamsScored", { points: teamOnePoints })
              : t("onYourVictory")}
          </p>
          {!outcome.isTie && (
            <p className="text-yellow-400 text-3xl md:text-5xl font-black drop-shadow-md">
              {outcome.winnerName} {t("winner")}!
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-8 w-full px-2   justify-items-center items-center">
          <motion.div
            variants={itemVars}
            className={`bg-white p-3 flex flex-col gap-3 rounded-[15px] border-4 w-full md:max-w-[220px] lg:max-w-[280px] ${
              outcome.isTie || outcome.winnerTeam === 1
                ? "border-primary"
                : "border-error"
            }`}
          >
            <div
              className={`py-4 lg:py-10 rounded-[10px] flex justify-center items-center ${
                outcome.isTie || outcome.winnerTeam === 1
                  ? "bg-primary/20"
                  : "bg-error/20"
              }`}
            >
              <Image
                alt="result"
                width={100}
                height={100}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 object-contain"
                src={
                  outcome.isTie || outcome.winnerTeam === 1
                    ? "/staticImages/winner.png"
                    : "/staticImages/lose.png"
                }
              />
            </div>
            <p
              className={`text-xl font-bold text-center truncate px-1 ${
                outcome.isTie || outcome.winnerTeam === 1
                  ? "text-primary"
                  : "text-error"
              }`}
            >
              {teamOneName}
            </p>
            <p
              className={`text-lg font-bold text-center ${
                outcome.isTie || outcome.winnerTeam === 1
                  ? "text-primary"
                  : "text-error"
              }`}
            >
              {teamOnePoints} <span className="text-xs">{t("points")}</span>
            </p>
          </motion.div>

          <motion.div
            variants={itemVars}
            className="hidden md:flex items-center justify-center"
          >
            <motion.div
              variants={itemVars}
              className="text-center space-y-2 px-4 hidden sm:block lg:hidden"
            >
              <p className="text-white text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
                {outcome.isTie ? t("tieGame") : t("congratulations")}
              </p>
              <p className="text-white text-xl md:text-2xl font-bold opacity-90">
                {outcome.isTie
                  ? t("bothTeamsScored", { points: teamOnePoints })
                  : t("onYourVictory")}
              </p>
              {!outcome.isTie && (
                <p className="text-yellow-400 text-3xl md:text-5xl font-black drop-shadow-md">
                  {outcome.winnerName} {t("winner")}!
                </p>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVars}
            className={`bg-white p-3 flex flex-col gap-3 rounded-[15px] border-4 w-full md:max-w-[220px] lg:max-w-[280px] ${
              outcome.isTie || outcome.winnerTeam === 2
                ? "border-primary"
                : "border-error"
            }`}
          >
            <div
              className={`py-4 lg:py-10 rounded-[10px] flex justify-center items-center ${
                outcome.isTie || outcome.winnerTeam === 2
                  ? "bg-primary/20"
                  : "bg-error/20"
              }`}
            >
              <Image
                alt="result"
                width={100}
                height={100}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 object-contain"
                src={
                  outcome.isTie || outcome.winnerTeam === 2
                    ? "/staticImages/winner.png"
                    : "/staticImages/lose.png"
                }
              />
            </div>
            <p
              className={`text-xl font-bold text-center truncate px-1 ${
                outcome.isTie || outcome.winnerTeam === 2
                  ? "text-primary"
                  : "text-error"
              }`}
            >
              {teamTwoName}
            </p>
            <p
              className={`text-lg font-bold text-center ${
                outcome.isTie || outcome.winnerTeam === 2
                  ? "text-primary"
                  : "text-error"
              }`}
            >
              {teamTwoPoints} <span className="text-xs">{t("points")}</span>
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVars} className="w-full max-w-[240px] mt-4">
          <Button
            onClick={() => router.replace("/")}
            size="large"
            variant="secondary"
            className="w-full py-4 text-lg font-black rounded-xl shadow-lg"
          >
            {t("backToHomePage")}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
