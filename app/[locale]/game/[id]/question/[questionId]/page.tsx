"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useEffect } from "react";

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

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const questionIdParam = params?.questionId;
  const validQuestionId = useMemo(() => {
    if (!questionIdParam) return null;
    return Array.isArray(questionIdParam)
      ? questionIdParam[0]
      : questionIdParam;
  }, [questionIdParam]);

  const gameIdParam = params?.id;
  const validGameId = useMemo(() => {
    if (!gameIdParam) return null;
    return Array.isArray(gameIdParam) ? gameIdParam[0] : gameIdParam;
  }, [gameIdParam]);

  // Get Zustand state
  const answer = useGameStore((s) => s.answer);
  const whoAnswer = useGameStore((s) => s.whoAnswer);
  const turn = useGameStore((s) => s.turn);
  const setPendingDoublePoint = useGameStore((s) => s.setPendingDoublePoint);
  const setPendingTakePoint = useGameStore((s) => s.setPendingTakePoint);
  const setPendingSilence = useGameStore((s) => s.setPendingSilence);

  // Get current question from store
  const question = useGameStore((state) => {
    if (!validQuestionId) return undefined;
    return state.findQuestionById(validQuestionId);
  });

  // Check if game data is ready
  const isGameLoaded = useGameStore((state) => {
    return (
      state.time200 !== undefined &&
      state.time400 !== undefined &&
      state.time600 !== undefined &&
      state.categories.length > 0
    );
  });

  const queryClient = useQueryClient();

  // Mutations for double/take/silence (called when URL parameters are present)
  const doublePointMutation = useMutation({
    mutationFn: () => {
      if (!validGameId || !validQuestionId) throw new Error("Missing IDs");
      return putDoublePoints(validGameId, validQuestionId);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const gameStore = useGameStore.getState();
        gameStore.setCanUseDoublePoint(false);
        if (turn === 1) {
          gameStore.setUsedDoublePointTeamOne(true);
        } else {
          gameStore.setUsedDoublePointTeamTwo(true);
        }
        if (validGameId)
          queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success("Double points applied to this question!");
        setPendingDoublePoint(false);
      } else {
        toast.error(data?.errors || "Failed to apply double points");
      }
    },
    onError: (err) => {
      console.error("Double points error:", err);
      toast.error("An error occurred while applying double points");
    },
  });

  const takePointMutation = useMutation({
    mutationFn: () => {
      if (!validGameId || !validQuestionId) throw new Error("Missing IDs");
      return putTakePoints(validGameId, validQuestionId);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const gameStore = useGameStore.getState();
        gameStore.changeTakePoint(validGameId as string, turn);
        if (validGameId)
          queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success("Take points applied to this question!");
        setPendingTakePoint(false);
      } else {
        toast.error(data?.errors || "Failed to apply take points");
      }
    },
    onError: (err) => {
      console.error("Take points error:", err);
      toast.error("An error occurred while applying take points");
    },
  });

  const silenceMutation = useMutation({
    mutationFn: () => {
      if (!validGameId) throw new Error("Missing game ID");
      return putSilence(validGameId);
    },
    onSuccess: (data) => {
      if (data.success) {
        const gameStore = useGameStore.getState();
        gameStore.useSilence(validGameId as string, turn);
        gameStore.setCanUseSilence(false);
        if (validGameId)
          queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success("Silence applied to opposing team!");
        setPendingSilence(false);
      } else {
        toast.error(data?.errors || "Failed to apply silence");
      }
    },
    onError: (err) => {
      console.error("Silence error:", err);
      toast.error("An error occurred while applying silence");
    },
  });

  // On mount, detect query params and trigger mutations if present
  useEffect(() => {
    if (!searchParams || !validGameId || !validQuestionId) return;

    const assistantType = searchParams.get("assistant");

    if (!assistantType) return;

    console.log("Applying assistant:", assistantType);

    if (assistantType === "doublePoint" && !doublePointMutation.isPending) {
      console.log("Triggering double point mutation...");
      doublePointMutation.mutate();
    } else if (assistantType === "takePoint" && !takePointMutation.isPending) {
      console.log("Triggering take point mutation...");
      takePointMutation.mutate();
    } else if (assistantType === "silence" && !silenceMutation.isPending) {
      console.log("Triggering silence mutation...");
      silenceMutation.mutate();
    }

    // Clean up URL parameters after processing
    const url = new URL(window.location.href);
    url.searchParams.delete("assistant");
    window.history.replaceState({}, "", url.toString());
  }, [searchParams, validGameId, validQuestionId]);

  if (!isGameLoaded || !question) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-secondary text-lg">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-10 h-full w-full flex justify-center items-center">
      <div className="border-[3px] border-secondary rounded-[40px] p-5 h-full w-full bg-light-purple relative">
        <TopBar questionPoints={question.points} />

        {!answer && !whoAnswer ? (
          <QuestionComponent />
        ) : answer && !whoAnswer ? (
          <AnswerComponent />
        ) : (
          <WhoAnsweredComponent />
        )}
      </div>
    </div>
  );
}
