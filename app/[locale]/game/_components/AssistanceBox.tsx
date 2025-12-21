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
import { putSilence } from "@/core/game/silence-team-service";
import { useTranslations } from "next-intl";
import { ChangeQuestionIcon } from "../../_components/icons/ChangeQuestionIcon";
import { SkipQuestionIcon } from "../../_components/icons/SkipQuestionIcon";
import { FiftyByFiftyIcon } from "../../_components/icons/FiftyByFiftyIcon";
import { DoublePointsIcon } from "../../_components/icons/DoublePointsIcon";
import { TakePointsIcon } from "../../_components/icons/TakePointsIcon";
import { Button } from "../../_components/button/button";

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
  const t = useTranslations("assistants");
  const router = useRouter();
  const queryClient = useQueryClient();
  const gameStore = useGameStore();

  const isAnyAssistantUsedInThisTurn =
    gameStore.isSilenceInThisTurn ||
    gameStore.isDoublePointInThisTurn ||
    gameStore.pendingDoublePoint ||
    gameStore.pendingTakePoint ||
    gameStore.pendingSilence;

  const changeQuestionMutation = useMutation({
    mutationFn: () => putChangeQuestion(gameStore.id, questionId!, team),
    onSuccess: (data) => {
      if (data.success && data.data) {
        gameStore.changeQuestion(gameStore.id, questionId!, data.data, team);
        queryClient.invalidateQueries({ queryKey: ["game", gameStore.id] });
        router.replace(`/game/${gameStore.id}/question/${data?.data?.id}`);
        toast.success(t("changeQuestionSuccess"));
      }
    },
  });

  const skipQuestionMutation = useMutation({
    mutationFn: () => putSkipQuestion(gameStore.id, questionId!),
    onSuccess: () => {
      gameStore.changeSkipQuestion(gameStore.id, team, questionId!);
      queryClient.invalidateQueries({ queryKey: ["game", gameStore.id] });
      toast.success(t("skipQuestionSuccess"));
      router.push(`/game/${gameStore.id}`);
    },
  });

  const fiftyFiftyMutation = useMutation({
    mutationFn: () => putFiftyFifty(gameStore.id, questionId!),
    onSuccess: (data) => {
      if (data.success && data.data) {
        gameStore.removeTwoAnswerForMultipleChoiceQuestioon(
          gameStore.id,
          questionId!,
          data.data,
          team
        );
        queryClient.invalidateQueries({ queryKey: ["game", gameStore.id] });
        toast.success(t("fiftyFiftySuccess"));
      }
    },
  });

  const silenceMutation = useMutation({
    mutationFn: () => putSilence(gameStore.id),
    onSuccess: () => {
      gameStore.useSilence(gameStore.id, team);
      queryClient.invalidateQueries({ queryKey: ["game", gameStore.id] });
      toast.success(t("silenceSuccess"));
    },
  });

  const isAssistantDisabled = (
    assistantKey:
      | "DoublePoints"
      | "TakePoints"
      | "ChangeQuestion"
      | "SkipQuestion"
      | "UseSilence"
      | "Remove2Options",
    usedFlag: boolean,
    allowedContext: "gameboard" | "question"
  ) => {
    if (!gameStore.assistants?.includes(assistantKey)) return true;
    if (gameStore.turn !== team) return true;
    if (context !== allowedContext) return true;
    if (usedFlag) return true;
    if (isAnyAssistantUsedInThisTurn) return true;
    if (gameStore.answer || gameStore.whoAnswer) return true;
    return false;
  };

  const handlePendingActivation = (
    type: "DoublePoints" | "TakePoints" | "Silence"
  ) => {
    if (isAnyAssistantUsedInThisTurn) {
      toast.warning(t("onlyOnePerTurn"));
      return;
    }
    if (type === "DoublePoints") gameStore.setPendingDoublePoint(true);
    if (type === "TakePoints") gameStore.setPendingTakePoint(true);
    if (type === "Silence") gameStore.setPendingSilence(true);
    toast.info(t("selectQuestion"));
  };

  const iconSize = 32;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={
          questionId || gameStore?.layoutType === "version1"
            ? "grid grid-cols-6 gap-2"
            : "grid grid-cols-6 md:grid-cols-3 gap-2"
        }
      >
        <Button
          onClick={() => changeQuestionMutation.mutate()}
          isLoading={changeQuestionMutation.isPending}
          disabled={isAssistantDisabled(
            "ChangeQuestion",
            team === 1
              ? gameStore.usedChangeQuestionTeamOne
              : gameStore.usedChangeQuestionTeamTwo,
            "question"
          )}
          variant="light-blue-gradient"
          shape="square"
          className="!p-1 !rounded-[5px] w-7 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
        >
          <ChangeQuestionIcon size={iconSize} />
        </Button>

        <Button
          onClick={() => skipQuestionMutation.mutate()}
          isLoading={skipQuestionMutation.isPending}
          disabled={isAssistantDisabled(
            "SkipQuestion",
            team === 1
              ? gameStore.usedSkipQuestionTeamOne
              : gameStore.usedSkipQuestionTeamTwo,
            "question"
          )}
          variant="light-orange-gradient"
          shape="square"
          className="!p-1 !rounded-[5px] w-7 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
        >
          <SkipQuestionIcon size={iconSize} />
        </Button>

        <Button
          onClick={() =>
            context === "gameboard"
              ? handlePendingActivation("Silence")
              : silenceMutation.mutate()
          }
          isLoading={silenceMutation.isPending}
          disabled={isAssistantDisabled(
            "UseSilence",
            team === 1
              ? gameStore.usedSilenceTeamOne
              : gameStore.usedSilenceTeamTwo,
            context
          )}
          variant="primary"
          shape="square"
          className="!p-1 !rounded-[5px] w-7 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
        >
          <div className="relative w-6 h-6 lg:w-10 lg:h-10">
            <Image
              alt="silence"
              fill
              src="/icons/redCard.svg"
              className="object-contain"
            />
          </div>
        </Button>

        <Button
          onClick={() => fiftyFiftyMutation.mutate()}
          isLoading={fiftyFiftyMutation.isPending}
          disabled={isAssistantDisabled(
            "Remove2Options",
            team === 1
              ? gameStore.usedRemoveOptionTeamOne
              : gameStore.usedRemoveOptionTeamTwo,
            "question"
          )}
          variant="light-purple-gradient"
          shape="square"
          className="!p-1 !rounded-[5px] w-7 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
        >
          <FiftyByFiftyIcon size={iconSize} />
        </Button>

        <Button
          onClick={() => handlePendingActivation("DoublePoints")}
          disabled={isAssistantDisabled(
            "DoublePoints",
            team === 1
              ? gameStore.usedDoublePointTeamOne
              : gameStore.usedDoublePointTeamTwo,
            "gameboard"
          )}
          variant="magenta-gradient"
          shape="square"
          className="!p-1 !rounded-[5px] w-7 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
        >
          <DoublePointsIcon size={iconSize} />
        </Button>

        <Button
          onClick={() => handlePendingActivation("TakePoints")}
          disabled={isAssistantDisabled(
            "TakePoints",
            team === 1
              ? gameStore.usedTakePointsTeamOne
              : gameStore.usedTakePointsTeamTwo,
            "gameboard"
          )}
          variant="orange-gradient"
          shape="square"
          className="!p-1 !rounded-[5px] w-7 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
        >
          <TakePointsIcon size={iconSize} />
        </Button>
      </div>
    </div>
  );
}
