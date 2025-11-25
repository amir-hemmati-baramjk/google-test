"use client";

import React from "react";
import { Button } from "../../_components/button/button";
import { ChangeQuestionIcon } from "../../_components/icons/ChangeQuestionIcon";
import { DoublePointsIcon } from "../../_components/icons/DoublePointsIcon";
import { FiftyByFiftyIcon } from "../../_components/icons/FiftyByFiftyIcon";
import { SkipQuestionIcon } from "../../_components/icons/SkipQuestionIcon";
import { TakePointsIcon } from "../../_components/icons/TakePointsIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/stores/gameStore";
import { putChangeQuestion } from "@/core/game/change-question-service";
import { putDoublePoints } from "@/core/game/double-points-service";
import { putSkipQuestion } from "@/core/game/skip-question-service";
import { putTakePoints } from "@/core/game/take-points-service";
import { putFiftyFifty } from "@/core/game/fifty-fifty-service";
import { toast } from "react-toastify";

export default function AssistanceBox() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: gameId, questionId } = useParams();

  // Get data from Zustand store
  const {
    changeQuestion: changeQuestionStore,
    removeTwoAnswerForMultipleChoiceQuestioon: fiftyFiftyStore,
    changeTakePoint: takePointsStore,
    changeSkipQuestion: skipQuestionStore,
    turn,
    usedChangeQuestionTeamOne,
    usedChangeQuestionTeamTwo,
    usedDoublePointTeamOne,
    usedDoublePointTeamTwo,
    usedSkipQuestionTeamOne,
    usedSkipQuestionTeamTwo,
    usedTakePointsTeamOne,
    usedTakePointsTeamTwo,
    usedRemoveOptionTeamOne,
    usedRemoveOptionTeamTwo,
  } = useGameStore();

  // Helper function to get valid IDs
  const getValidIds = () => {
    const validGameId = Array.isArray(gameId) ? gameId[0] : gameId;
    const validQuestionId = Array.isArray(questionId)
      ? questionId[0]
      : questionId;

    if (!validGameId) {
      throw new Error("Game ID is missing");
    }

    return { validGameId, validQuestionId };
  };

  // Check if assistances are used based on current team
  const isChangeQuestionUsed =
    turn === 1 ? usedChangeQuestionTeamOne : usedChangeQuestionTeamTwo;
  const isDoublePointsUsed =
    turn === 1 ? usedDoublePointTeamOne : usedDoublePointTeamTwo;
  const isSkipQuestionUsed =
    turn === 1 ? usedSkipQuestionTeamOne : usedSkipQuestionTeamTwo;
  const isTakePointsUsed =
    turn === 1 ? usedTakePointsTeamOne : usedTakePointsTeamTwo;
  const isFiftyFiftyUsed =
    turn === 1 ? usedRemoveOptionTeamOne : usedRemoveOptionTeamTwo;

  // React Query mutations for all assistances
  const changeQuestionMutation = useMutation({
    mutationFn: () => {
      const { validGameId, validQuestionId } = getValidIds();
      if (!validQuestionId) throw new Error("Question ID is missing");
      return putChangeQuestion(validGameId, validQuestionId, turn);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const { validGameId, validQuestionId } = getValidIds();
        if (!validQuestionId) return;

        changeQuestionStore(validGameId, validQuestionId, data.data, turn);
        router.replace(`/game/${validGameId}/question/${data.data.id}`);
        queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
      } else {
        toast.error(data?.errors || "Failed to change question");
      }
    },
    onError: (error) => {
      console.error("Change question error:", error);
      toast.error("An error occurred while changing the question");
    },
  });

  const doublePointsMutation = useMutation({
    mutationFn: () => {
      const { validGameId } = getValidIds();
      return putDoublePoints(validGameId, turn);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const { validGameId } = getValidIds();
        // Update store with double points activation
        // You might need to add a setGame function or specific double points function
        queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success("Double points activated! 🎉");
      } else {
        toast.error(data?.errors || "Failed to activate double points");
      }
    },
    onError: (error) => {
      console.error("Double points error:", error);
      toast.error("An error occurred while activating double points");
    },
  });

  const skipQuestionMutation = useMutation({
    mutationFn: () => {
      const { validGameId, validQuestionId } = getValidIds();
      if (!validQuestionId) throw new Error("Question ID is missing");
      return putSkipQuestion(validGameId, validQuestionId, turn);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const { validGameId, validQuestionId } = getValidIds();
        if (!validQuestionId) return;

        skipQuestionStore(validGameId, turn, validQuestionId);
        queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success("Question skipped!");
      } else {
        toast.error(data?.errors || "Failed to skip question");
      }
    },
    onError: (error) => {
      console.error("Skip question error:", error);
      toast.error("An error occurred while skipping the question");
    },
  });

  const takePointsMutation = useMutation({
    mutationFn: () => {
      const { validGameId } = getValidIds();
      return putTakePoints(validGameId, turn);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const { validGameId } = getValidIds();
        takePointsStore(validGameId, turn);
        queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success("Points taken successfully! 💯");
      } else {
        toast.error(data?.errors || "Failed to take points");
      }
    },
    onError: (error) => {
      console.error("Take points error:", error);
      toast.error("An error occurred while taking points");
    },
  });

  const fiftyFiftyMutation = useMutation({
    mutationFn: () => {
      const { validGameId, validQuestionId } = getValidIds();
      if (!validQuestionId) throw new Error("Question ID is missing");
      return putFiftyFifty(validGameId, validQuestionId, turn);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        const { validGameId, validQuestionId } = getValidIds();
        if (!validQuestionId) return;

        fiftyFiftyStore(validGameId, validQuestionId, data.data, turn);
        queryClient.invalidateQueries({ queryKey: ["game", validGameId] });
        toast.success("50/50 used! Two options removed.");
      } else {
        toast.error(data?.errors || "Failed to use 50/50");
      }
    },
    onError: (error) => {
      console.error("50/50 error:", error);
      toast.error("An error occurred while using 50/50");
    },
  });

  // Handler functions with proper checks
  const handleChangeQuestion = () => {
    if (isChangeQuestionUsed) return;
    changeQuestionMutation.mutate();
  };

  const handleDoublePoints = () => {
    if (isDoublePointsUsed) return;
    doublePointsMutation.mutate();
  };

  const handleSkipQuestion = () => {
    if (isSkipQuestionUsed) return;
    skipQuestionMutation.mutate();
  };

  const handleTakePoints = () => {
    if (isTakePointsUsed) return;
    takePointsMutation.mutate();
  };

  const handleFiftyFifty = () => {
    if (isFiftyFiftyUsed) return;
    fiftyFiftyMutation.mutate();
  };

  // Check if any mutation is loading
  const isAnyMutationLoading =
    changeQuestionMutation.isPending ||
    doublePointsMutation.isPending ||
    skipQuestionMutation.isPending ||
    takePointsMutation.isPending ||
    fiftyFiftyMutation.isPending;

  return (
    <div className="flex justify-center flex-col items-center gap-1 lg:gap-2">
      <p className="font-[700] text-secondary text-sm lg:text-lg xl:text-xl 2xl:text-2xl">
        Assistance
      </p>
      <div className="grid grid-cols-3 gap-1 lg:gap-2 text-white w-fit">
        {/* Change Question */}
        <Button
          onClick={handleChangeQuestion}
          isLoading={changeQuestionMutation.isPending}
          disabled={
            isChangeQuestionUsed ||
            (isAnyMutationLoading && !changeQuestionMutation.isPending)
          }
          className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 ${
            isChangeQuestionUsed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          variant="light-blue-gradient"
          shape="square"
        >
          <ChangeQuestionIcon size={48} />
        </Button>

        {/* Double Points */}
        <Button
          onClick={handleDoublePoints}
          isLoading={doublePointsMutation.isPending}
          disabled={
            isDoublePointsUsed ||
            (isAnyMutationLoading && !doublePointsMutation.isPending)
          }
          className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 ${
            isDoublePointsUsed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          variant="light-orange-gradient"
          shape="square"
        >
          <DoublePointsIcon size={48} />
        </Button>

        {/* 50/50 */}
        <Button
          onClick={handleFiftyFifty}
          isLoading={fiftyFiftyMutation.isPending}
          disabled={
            isFiftyFiftyUsed ||
            (isAnyMutationLoading && !fiftyFiftyMutation.isPending)
          }
          className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 ${
            isFiftyFiftyUsed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          variant="light-purple-gradient"
          shape="square"
        >
          <FiftyByFiftyIcon size={48} />
        </Button>

        {/* Skip Question */}
        <Button
          onClick={handleSkipQuestion}
          isLoading={skipQuestionMutation.isPending}
          disabled={
            isSkipQuestionUsed ||
            (isAnyMutationLoading && !skipQuestionMutation.isPending)
          }
          className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 ${
            isSkipQuestionUsed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          variant="magenta-gradient"
          shape="square"
        >
          <SkipQuestionIcon size={48} />
        </Button>

        {/* Take Points */}
        <Button
          onClick={handleTakePoints}
          isLoading={takePointsMutation.isPending}
          disabled={
            isTakePointsUsed ||
            (isAnyMutationLoading && !takePointsMutation.isPending)
          }
          className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 ${
            isTakePointsUsed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          variant="orange-gradient"
          shape="square"
        >
          <TakePointsIcon size={48} />
        </Button>

        {/* Extra Button (You can remove or repurpose this) */}
        <Button
          className="!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 opacity-50 cursor-not-allowed"
          variant="secondary-gradient"
          shape="square"
          disabled
        >
          <ChangeQuestionIcon size={48} />
        </Button>
      </div>

      {/* Status indicators */}
      {isAnyMutationLoading && (
        <p className="text-secondary text-xs mt-1">Processing...</p>
      )}
    </div>
  );
}
