"use client";
import React, { useRef, useState, useEffect } from "react";
import { useTournamentStore } from "@/stores/tournamentStore";
import { TimerCountDown, TimerRef } from "../_components/CountDownTimer";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import LogoMotionLoading from "../../_components/logoMotionLoading/LogoMotionLoading";

export default function WaitingPage() {
  const { tournament, questions } = useTournamentStore();
  const timerRef = useRef<TimerRef>(null);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (tournament?.startAt) {
      const timeout = setTimeout(() => setIsReady(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [tournament]);

  if (!isReady || !tournament) {
    return (
      <div className="py-40 flex justify-center">
        <LogoMotionLoading />
      </div>
    );
  }

  const startTime = new Date(tournament.startAt + "Z");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-[800px] mx-auto mt-10 rounded-[16px] p-5"
    >
      <TimerCountDown
        ref={timerRef}
        showTitle={true}
        expiryTimestamp={startTime}
        onExpire={() =>
          questions.length > 0 &&
          router.push(`/tournament/${tournament.id}/${questions[0].id}`)
        }
      />
      <div className="p-5 md:p-10 bg-light-purple mt-5 rounded-[20px] flex flex-col justify-center items-center gap-5 border-[2px] border-secondary">
        <Image
          alt="notif"
          width={100}
          height={100}
          src={"/icons/tournament-notif.svg"}
        />
        <p className="font-bold text-xl lg:text-4xl text-secondary">
          Game Starts Soon!
        </p>
      </div>
    </motion.div>
  );
}
