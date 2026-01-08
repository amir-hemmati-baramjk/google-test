"use client";

import { Button } from "@/app/[locale]/_components/button/button";
import { TimePauseIcon } from "@/app/[locale]/_components/icons/TimePauseIcon";
import { TimeResetIcon } from "@/app/[locale]/_components/icons/TimeResetIcon";
import { useGameStore } from "@/stores/gameStore";
import { PlayIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteAccountIcon } from "@/app/[locale]/_components/icons/DeleteAccountIcon";
import ReportQuestionModal from "./ReportQuestionModal";

interface TopBarProps {
  questionPoints: number;
}

export default function TopBar({ questionPoints }: TopBarProps) {
  const t = useTranslations("questionPage");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showReportQuestionModal, setShowReportQuestionModal] = useState(false);
  const [initialTime, setInitialTime] = useState<number>(0);
  const params = useParams();

  const time200 = useGameStore((s) => s.time200);
  const time400 = useGameStore((s) => s.time400);
  const time600 = useGameStore((s) => s.time600);
  const answer = useGameStore((s) => s.answer);
  const whoAnswer = useGameStore((s) => s.whoAnswer);
  const calculateInitialTime = useCallback(
    (points: number) => {
      if (points <= 200 && time200 != null) return time200;
      if (points <= 400 && time400 != null) return time400;
      if (points <= 600 && time600 != null) return time600;
      return 60;
    },
    [time200, time400, time600]
  );

  useEffect(() => {
    const calculatedTime = calculateInitialTime(questionPoints);
    setInitialTime(calculatedTime);
    setTimeLeft(calculatedTime);
    setIsPaused(false);
  }, [questionPoints, calculateInitialTime]);
  useEffect(() => {
    if (answer || whoAnswer) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  }, [answer, whoAnswer]);
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePausePlay = () => setIsPaused(!isPaused);
  const handleReset = () => {
    setTimeLeft(initialTime);
    setIsPaused(false);
  };

  const getPausePlayIcon = () =>
    isPaused ? <PlayIcon size={24} /> : <TimePauseIcon size={48} />;

  const questionIdParam = params?.questionId;
  const validQuestionId = useMemo(() => {
    if (!questionIdParam) return null;
    return Array.isArray(questionIdParam)
      ? questionIdParam[0]
      : questionIdParam;
  }, [questionIdParam]);

  const category = useGameStore(
    useCallback(
      (s) => {
        if (!validQuestionId) return undefined;
        return s.categories.find((cat) =>
          cat.questions.some((q) => q.id === validQuestionId)
        );
      },
      [validQuestionId]
    )
  );

  const isDangerZone = timeLeft > 0 && timeLeft <= 5 && !isPaused;

  return (
    <div className="w-full m-auto flex justify-center xl:justify-around items-center gap-3 absolute -top-5 lg:-top-7 left-0 z-50">
      <div className="bg-light-purple px-5 text-secondary border-[2px] hidden md:flex border-secondary font-bold rounded-[6px] text-sm md:text-lg lg:text-xl xl:text-2xl">
        {t("points")} : {questionPoints}
      </div>

      <div className="flex justify-center items-center gap-1">
        <Button
          variant="secondary"
          isOutline
          shape="square"
          className="!p-1 w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
          onClick={handlePausePlay}
        >
          {getPausePlayIcon()}
        </Button>

        <div className="relative">
          <motion.div
            key={timeLeft}
            animate={
              isDangerZone
                ? {
                    scale: [1, 1.1, 1],
                    x: [0, -4, 4, -4, 4, 0],
                  }
                : {}
            }
            className={`
    relative z-10 font-bold px-5 p-1 lg:py-2 text-sm md:text-lg lg:text-xl xl:text-2xl min-w-[100px] text-center
    ${
      isDangerZone
        ? "danger-border-box text-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        : "bg-light-purple text-secondary border-[2px] border-secondary rounded-[5px]"
    }
  `}
          >
            {formatTime(timeLeft)}

            <AnimatePresence>
              {isDangerZone && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.7 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-red-500 rounded-[5px] -z-20 blur-md"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <Button
          variant="secondary"
          isOutline
          shape="square"
          className="!p-1 w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
          onClick={handleReset}
        >
          <TimeResetIcon size={48} />
        </Button>
      </div>

      <div className="hidden sm:block bg-light-purple truncate max-w-[140px] px-5 text-secondary border-[2px] border-secondary font-bold rounded-[6px] text-sm md:text-lg lg:text-xl xl:text-2xl">
        {category?.name}
      </div>
      <Button
        onClick={() => setShowReportQuestionModal(true)}
        className=" left-0 absolute !font-bold !px-3 !py-1 !text-[20px]"
        shape="square"
        variant="magenta-gradients"
      >
        VAR
      </Button>
      <ReportQuestionModal
        isOpen={showReportQuestionModal}
        onClose={() => setShowReportQuestionModal(false)}
      />
    </div>
  );
}
