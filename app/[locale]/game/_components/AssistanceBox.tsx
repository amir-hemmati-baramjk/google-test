"use client";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useGameStore } from "@/stores/gameStore";

import { putChangeQuestion } from "@/core/game/change-question-service";
import { putSkipQuestion } from "@/core/game/skip-question-service";
import { putFiftyFifty } from "@/core/game/fifty-fifty-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeQuestionIcon } from "../../_components/icons/ChangeQuestionIcon";
import { Button } from "../../_components/button/button";
import { SkipQuestionIcon } from "../../_components/icons/SkipQuestionIcon";
import { FiftyByFiftyIcon } from "../../_components/icons/FiftyByFiftyIcon";
import { DoublePointsIcon } from "../../_components/icons/DoublePointsIcon";
import { TakePointsIcon } from "../../_components/icons/TakePointsIcon";
import { putSilence } from "@/core/game/silence-team-service";

interface AssistanceBoxProps {
  context: "gameboard" | "question";
  questionId?: string;
  team: number;
}

export default function AssistanceBox({
  context,
  questionId,
  team,
}: AssistanceBoxProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const turn = useGameStore((state) => state.turn);
  const gameId = useGameStore((state) => state.id);

  const gameStore = useGameStore.getState();

  // --- Mutations for Question Assistants
  const changeQuestionMutation = useMutation({
    mutationFn: () => {
      if (!questionId) throw new Error("Question ID missing");
      return putChangeQuestion(gameId, questionId, turn);
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        gameStore.changeQuestion(gameId, questionId!, data.data, turn);
        queryClient.invalidateQueries({ queryKey: ["game", gameId] });
        router.replace(`/game/${gameId}/question/${data?.data?.id}`);
        toast.success("Question changed!");
      }
    },
  });
  const isChangeQuestionLoading = changeQuestionMutation.isPending;

  const skipQuestionMutation = useMutation({
    mutationFn: () => {
      if (!questionId) throw new Error("Question ID missing");
      return putSkipQuestion(gameId, questionId);
    },
    onSuccess: () => {
      toast.success("Question skipped!");
    },
  });

  const silenceMutation = useMutation({
    mutationFn: () => {
      return putSilence(gameId);
    },
    onSuccess: () => toast.success("The opposing team must remain silent."),
  });
  const isSilenceLoading = silenceMutation.isPending;
  const isSkipQuestionLoading = skipQuestionMutation.isPending;

  const fiftyFiftyMutation = useMutation({
    mutationFn: () => {
      if (!questionId) throw new Error("Question ID missing");
      return putFiftyFifty(gameId, questionId);
    },
    onSuccess: () => toast.success("50/50 used!"),
  });
  const isFiftyFiftyLoading = fiftyFiftyMutation.isPending;

  // --- Handler functions
  const handleChangeQuestion = () => changeQuestionMutation.mutate();
  const handleSkipQuestion = () => skipQuestionMutation.mutate();
  const handleFiftyFifty = () => fiftyFiftyMutation.mutate();
  const handleSilence = () => silenceMutation.mutate();

  // Handle assistant clicks for gameboard context
  const handleAssistantClick = (
    assistantType: "doublePoint" | "takePoint" | "silence"
  ) => {
    if (context === "gameboard") {
      // Set pending state and redirect to gameboard
      if (assistantType === "doublePoint") {
        gameStore.setPendingDoublePoint(true);
      } else if (assistantType === "takePoint") {
        gameStore.setPendingTakePoint(true);
      } else if (assistantType === "silence") {
        gameStore.setPendingSilence(true);
      }

      toast.info("Please select a question to apply the assistant");
      router.push(`/game/${gameId}`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-bold text-secondary">Assistance</p>
      <div className="grid grid-cols-3 gap-2">
        {context === "question" && (
          <>
            <Button
              onClick={handleChangeQuestion}
              isLoading={isChangeQuestionLoading}
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14`}
              variant="light-blue-gradient"
              shape="square"
              isDisabled={
                !gameStore?.canUseChangeQuestion ||
                gameStore?.turn !== team ||
                (team == 1 && gameStore?.usedChangeQuestionTeamOne) ||
                (team == 2 && gameStore?.usedChangeQuestionTeamTwo)
              }
            >
              <ChangeQuestionIcon size={48} />
            </Button>
            <Button
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              onClick={handleSkipQuestion}
              isLoading={isSkipQuestionLoading}
              variant="light-orange-gradient"
              shape="square"
              isDisabled={
                !gameStore?.canUseSkipQuestion ||
                gameStore?.turn !== team ||
                (team == 1 && gameStore?.usedSkipQuestionTeamOne) ||
                (team == 2 && gameStore?.usedSkipQuestionTeamTwo)
              }
            >
              <SkipQuestionIcon size={48} />
            </Button>
            <Button
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              onClick={handleSilence}
              isLoading={isSilenceLoading}
              variant="primary"
              shape="square"
              isDisabled={true}
            >
              <Image
                alt="red card icons"
                width={48}
                height={48}
                src={"/icons/redCard.svg"}
              />
            </Button>
            <Button
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              onClick={handleFiftyFifty}
              isLoading={isFiftyFiftyLoading}
              variant="light-purple-gradient"
              shape="square"
              isDisabled={
                !gameStore?.canUseRemoveTwoOption ||
                gameStore?.turn !== team ||
                (team == 1 && gameStore?.usedRemoveOptionTeamOne) ||
                (team == 2 && gameStore?.usedRemoveOptionTeamTwo)
              }
            >
              <FiftyByFiftyIcon size={48} />
            </Button>
            <Button
              variant="magenta-gradient"
              shape="square"
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              isDisabled={true}
            >
              <DoublePointsIcon size={48} />
            </Button>
            <Button
              variant="orange-gradient"
              shape="square"
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              isDisabled={true}
            >
              <TakePointsIcon size={48} />
            </Button>
          </>
        )}

        {context === "gameboard" && (
          <>
            <Button
              onClick={handleChangeQuestion}
              isLoading={isChangeQuestionLoading}
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14`}
              variant="light-blue-gradient"
              shape="square"
              isDisabled={true}
            >
              <ChangeQuestionIcon size={48} />
            </Button>
            <Button
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              onClick={handleSkipQuestion}
              isLoading={isSkipQuestionLoading}
              variant="light-orange-gradient"
              shape="square"
              isDisabled={true}
            >
              <SkipQuestionIcon size={48} />
            </Button>
            <Button
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              onClick={() => handleAssistantClick("silence")}
              isLoading={isSilenceLoading}
              variant="primary"
              shape="square"
              isDisabled={
                !gameStore?.canUseSilence ||
                gameStore?.turn !== team ||
                (team == 1 && gameStore?.usedSilenceTeamOne) ||
                (team == 2 && gameStore?.usedSilenceTeamTwo)
              }
            >
              <Image
                alt="red card icons"
                width={48}
                height={48}
                src={"/icons/redCard.svg"}
              />
            </Button>
            <Button
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              onClick={handleFiftyFifty}
              isLoading={isFiftyFiftyLoading}
              variant="light-purple-gradient"
              shape="square"
              isDisabled={true}
            >
              <FiftyByFiftyIcon size={48} />
            </Button>
            <Button
              variant="magenta-gradient"
              shape="square"
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              onClick={() => handleAssistantClick("doublePoint")}
              isDisabled={
                !gameStore?.canUseDoublePoint ||
                gameStore?.turn !== team ||
                (team == 1 && gameStore?.usedDoublePointTeamOne) ||
                (team == 2 && gameStore?.usedDoublePointTeamTwo)
              }
            >
              <DoublePointsIcon size={48} />
            </Button>
            <Button
              variant="orange-gradient"
              shape="square"
              className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-14 xl:h-14 `}
              onClick={() => handleAssistantClick("takePoint")}
              isDisabled={
                !gameStore?.canUseTakePoints ||
                gameStore?.turn !== team ||
                (team == 1 && gameStore?.usedTakePointsTeamOne) ||
                (team == 2 && gameStore?.usedTakePointsTeamTwo)
              }
            >
              <TakePointsIcon size={48} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
