"use client";

import { Button } from "@/app/[locale]/_components/button/button";
import { TimePauseIcon } from "@/app/[locale]/_components/icons/TimePauseIcon";
import { TimeResetIcon } from "@/app/[locale]/_components/icons/TimeResetIcon";

import { useGameStore } from "@/stores/gameStore";
import { PlayIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";

interface TopBarProps {
  questionPoints: number;
}

export default function TopBar({ questionPoints }: TopBarProps) {
  const t = useTranslations("questionPage");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<number>(0);
  const params = useParams();
  // Get time configurations from store
  const time200 = useGameStore((s) => s.time200);
  const time400 = useGameStore((s) => s.time400);
  const time600 = useGameStore((s) => s.time600);

  // Calculate initial time based on question points
  const calculateInitialTime = useCallback(
    (points: number) => {
      // Use store time values if available, otherwise fallback to default logic
      if (points <= 200 && time200 !== null && time200 !== undefined) {
        return time200;
      } else if (points <= 400 && time400 !== null && time400 !== undefined) {
        return time400;
      } else if (points <= 600 && time600 !== null && time600 !== undefined) {
        return time600;
      } else {
        // Fallback to 60 seconds if no time configuration matches
        return 60;
      }
    },
    [time200, time400, time600]
  );

  // Initialize timer when component mounts or question points change
  useEffect(() => {
    const calculatedTime = calculateInitialTime(questionPoints);
    setInitialTime(calculatedTime);
    setTimeLeft(calculatedTime);
    setIsPaused(false);
  }, [questionPoints, calculateInitialTime]);

  // Countdown logic
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Handle time's up logic here if needed
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft]);

  // Format time to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle pause/play toggle
  const handlePausePlay = () => {
    setIsPaused(!isPaused);
  };

  // Handle reset timer
  const handleReset = () => {
    setTimeLeft(initialTime);
    setIsPaused(false);
  };

  // Get appropriate icon for pause/play button
  const getPausePlayIcon = () => {
    if (isPaused) {
      return <PlayIcon size={24} />;
    }
    return <TimePauseIcon size={48} />;
  };
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
  return (
    <div className="w-full m-auto flex justify-around items-center gap-3 absolute -top-5 lg:-top-7 left-0">
      <div className="bg-light-purple px-5 text-secondary border-[2px] border-secondary font-bold rounded-[6px] text-sm md:text-lg lg:text-xl xl:text-2xl">
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
        <div
          className={`text-secondary border-[2px] border-secondary font-bold rounded-[5px] bg-light-purple px-5 p-1 lg:py-2 text-sm md:text-lg lg:text-xl xl:text-2xl ${
            timeLeft <= 10 ? "text-red-500 animate-pulse" : ""
          }`}
        >
          {formatTime(timeLeft)}
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
      <div className="hidden sm:block bg-light-purple px-5 text-secondary border-[2px] border-secondary font-bold rounded-[6px] text-sm md:text-lg lg:text-xl xl:text-2xl">
        {category?.name}
      </div>
    </div>
  );
}
