"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useEffect, useState, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { useGameStore } from "@/stores/gameStore";
import TopBar from "./_components/topBar";
import QuestionComponent from "./_components/question";
import AnswerComponent from "./_components/answer";
import WhoAnsweredComponent from "./_components/whoAnswer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putDoublePoints } from "@/core/game/double-points-service";
import { putTakePoints } from "@/core/game/take-points-service";
import { putSilence } from "@/core/game/silence-team-service";
import { toast } from "react-toastify";
import { Button } from "@/app/[locale]/_components/button/button";
import { useTranslations } from "next-intl";
import LogoMotionLoading from "@/app/[locale]/_components/logoMotionLoading/LogoMotionLoading";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [selectedOption, setSelectedOption] = useState("");
  const assistanceT = useTranslations("assistants");
  const assistantProcessed = useRef(false);

  const questionIdParam = params?.questionId;
  const validQuestionId = useMemo(() => {
    if (!questionIdParam) return null;
    return Array.isArray(questionIdParam)
      ? questionIdParam[0]
      : questionIdParam;
  }, [questionIdParam]);

  const validGameId = useMemo(() => {
    const gameIdParam = params?.id;
    if (!gameIdParam) return null;
    return Array.isArray(gameIdParam) ? gameIdParam[0] : gameIdParam;
  }, [params?.id]);

  const {
    answer,
    whoAnswer,
    turn,
    setPendingDoublePoint,
    setPendingTakePoint,
    setPendingSilence,
    question,
    isGameLoaded,
  } = useGameStore(
    useShallow((s) => ({
      answer: s.answer,
      whoAnswer: s.whoAnswer,
      turn: s.turn,
      setPendingDoublePoint: s.setPendingDoublePoint,
      setPendingTakePoint: s.setPendingTakePoint,
      setPendingSilence: s.setPendingSilence,
      question: validQuestionId
        ? s.findQuestionById(validQuestionId)
        : undefined,
      isGameLoaded: s.time200 !== undefined && s.categories.length > 0,
    }))
  );

  const queryClient = useQueryClient();

  const doublePointMutation = useMutation({
    mutationFn: () => putDoublePoints(validGameId!, validQuestionId!),
    onSuccess: (data) => {
      if (data.success) {
        const gameStore = useGameStore.getState();
        gameStore.setCanUseDoublePoint(false);
        turn === 1
          ? gameStore.setUsedDoublePointTeamOne(true)
          : gameStore.setUsedDoublePointTeamTwo(true);
        queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success(assistanceT("doublePointsSuccess"));
        setPendingDoublePoint(false);
      }
    },
  });

  const takePointMutation = useMutation({
    mutationFn: () => putTakePoints(validGameId!, validQuestionId!),
    onSuccess: (data) => {
      if (data.success) {
        useGameStore.getState().changeTakePoint(validGameId!, turn);
        queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success(assistanceT("takePointsSuccess"));
        setPendingTakePoint(false);
      }
    },
  });

  const silenceMutation = useMutation({
    mutationFn: () => putSilence(validGameId!),
    onSuccess: (data) => {
      if (data.success) {
        const gameStore = useGameStore.getState();
        gameStore.useSilence(validGameId!, turn);
        gameStore.setCanUseSilence(false);
        queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success(assistanceT("silenceSuccess"));
        setPendingSilence(false);
      }
    },
  });

  useEffect(() => {
    const assistantType = searchParams.get("assistant");

    if (
      !assistantType ||
      !validGameId ||
      !validQuestionId ||
      assistantProcessed.current
    )
      return;

    assistantProcessed.current = true;

    if (assistantType === "doublePoint") doublePointMutation.mutate();
    else if (assistantType === "takePoint") takePointMutation.mutate();
    else if (assistantType === "silence") silenceMutation.mutate();

    const url = new URL(window.location.href);
    url.searchParams.delete("assistant");
    window.history.replaceState({}, "", url.toString());
  }, [searchParams, validGameId, validQuestionId]);

  if (!isGameLoaded || !question) {
    return (
      <div className="flex justify-center py-20 w-screen h-screen items-center backdrop-blur-3xl absolute top-0 left-0 z-[1000]">
        <LogoMotionLoading />
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-10 h-full w-full overflow-auto">
      <div
        className={`border-[3px] border-secondary rounded-[40px] p-5 w-full bg-light-purple relative ${
          question?.options?.length > 0 ? "h-[75%] md:h-[85%]" : "h-full"
        }`}
      >
        <TopBar questionPoints={question.points} />

        {!answer && !whoAnswer ? (
          <QuestionComponent />
        ) : answer && !whoAnswer ? (
          <AnswerComponent />
        ) : (
          <WhoAnsweredComponent />
        )}
      </div>

      {question?.options && !whoAnswer && (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 mt-8 [container-type:inline-size]">
          {question.options.map((item) => (
            <Button
              key={item.id}
              onClick={() => setSelectedOption(item?.id)}
              variant={
                answer
                  ? item?.id === question?.correctOption?.id
                    ? "success"
                    : "error"
                  : "secondary"
              }
              isOutline={!(selectedOption === item?.id || !!answer)}
              className="lg:!font-bold whitespace- !text-xs lg:!text-xl !rounded-[6px]"
            >
              {item?.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
