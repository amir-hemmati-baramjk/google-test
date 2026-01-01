"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTournamentStore } from "@/stores/tournamentStore";
import { LineTimerProgress } from "../../_components/LineTimerProgress";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import LogoMotionLoading from "@/app/[locale]/_components/logoMotionLoading/LogoMotionLoading";

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("tournament");
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const tournament = useTournamentStore((s) => s.tournament);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const tournamentStart = useMemo(
    () => (tournament ? new Date(tournament.startAt + "Z").getTime() : 0),
    [tournament?.startAt]
  );

  const tournamentEnd = useMemo(
    () => (tournament ? new Date(tournament.endAt + "Z").getTime() : 0),
    [tournament?.endAt]
  );

  useEffect(() => {
    if (!tournamentEnd) return;
    const update = () => {
      const remaining = tournamentEnd - Date.now();
      setTimeLeft(Math.max(0, remaining));
      if (remaining <= 0) router.replace(`/tournament/${id}/leaderboard`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [tournamentEnd, id, router]);

  if (timeLeft === null || !tournament) {
    return (
      <div className="py-40 flex justify-center">
        <LogoMotionLoading />
      </div>
    );
  }

  const maxTime = tournamentEnd - tournamentStart;

  return (
    <div className="px-5 w-full max-w-[800px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center bg-primary rounded-[10px] mt-5 px-5 py-3">
          <Image alt="hand" width={40} height={60} src={"/icons/hand.svg"} />
          <p className="text-white font-bold text-lg lg:text-2xl">
            {tournament?.participantCount} {t("participants")}
          </p>
        </div>
        <div className="mt-4">
          <LineTimerProgress
            value={maxTime - timeLeft}
            maxValue={maxTime}
            datePart="Seconds"
          >
            {Math.ceil(timeLeft / 1000)}
          </LineTimerProgress>
        </div>
      </motion.div>
      {children}
    </div>
  );
}
