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
  const t = useTranslations("GamePage");
  const router = useRouter();
  const queryClient = useQueryClient();

  const turn = useGameStore((state) => state.turn);
  const gameId = useGameStore((state) => state.id);
  const answer = useGameStore((s) => s.answer);
  const whoAnswer = useGameStore((s) => s.whoAnswer);
  const layoutType = useGameStore((s) => s.layoutType);

  const assistants = useGameStore((s) => s.assistants) || [];
  const gameStore = useGameStore.getState();

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
        toast.success(t("assistants.questionChanged"));
      }
    },
  });

  const skipQuestionMutation = useMutation({
    mutationFn: () => {
      if (!questionId) throw new Error("Question ID missing");
      return putSkipQuestion(gameId, questionId);
    },
    onSuccess: () => toast.success(t("assistants.questionSkipped")),
  });

  const silenceMutation = useMutation({
    mutationFn: () => putSilence(gameId),
    onSuccess: () => toast.success(t("assistants.silenceApplied")),
  });

  const fiftyFiftyMutation = useMutation({
    mutationFn: () => {
      if (!questionId) throw new Error("Question ID missing");
      return putFiftyFifty(gameId, questionId);
    },
    onSuccess: () => toast.success(t("assistants.fiftyFiftyUsed")),
  });

  const isAssistantDisabled = (
    assistantKey:
      | "DoublePoints"
      | "TakePoints"
      | "ChangeQuestion"
      | "SkipQuestion"
      | "UseSilence"
      | "Remove2Options",
    usedTeamOne: boolean,
    usedTeamTwo: boolean,
    contextRestriction: boolean = false
  ): boolean => {
    if (!assistants.includes(assistantKey)) return true;

    if (contextRestriction) return true;

    if (turn !== team) return true;
    if (team === 1 && usedTeamOne) return true;
    if (team === 2 && usedTeamTwo) return true;
    if (answer || whoAnswer) return true;

    return false;
  };

  const handleAssistantClick = (
    assistantType: "DoublePoints" | "TakePoints" | "UseSilence"
  ) => {
    if (context === "gameboard") {
      if (assistantType === "DoublePoints")
        gameStore.setPendingDoublePoint(true);
      if (assistantType === "TakePoints") gameStore.setPendingTakePoint(true);
      if (assistantType === "UseSilence") gameStore.setPendingSilence(true);

      toast.info(t("gameboard.selectQuestionAssistant"));
      router.push(`/game/${gameId}`);
    }
  };

  const AssistantButton = ({
    onClick,
    isLoading,
    isDisabled,
    variant,
    icon,
    label,
  }: any) => (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      disabled={isDisabled}
      className="!p-1 !rounded-[5px] w-7 h-7 sm:w-7 sm:h-7 md:w-7 md:h-7 lg:w-10 lg:h-10 xl:w-14 xl:h-14"
      variant={variant}
      shape="square"
      title={label}
    >
      {icon}
    </Button>
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={
          questionId || layoutType === "version1"
            ? "grid grid-cols-6 gap-2"
            : "grid grid-cols-6 md:grid-cols-3 gap-2"
        }
      >
        {/* 1. Change Question */}
        <AssistantButton
          onClick={() => changeQuestionMutation.mutate()}
          isLoading={changeQuestionMutation.isPending}
          isDisabled={isAssistantDisabled(
            "ChangeQuestion",
            !!gameStore?.usedChangeQuestionTeamOne,
            !!gameStore?.usedChangeQuestionTeamTwo,
            context === "gameboard"
          )}
          variant="light-blue-gradient"
          icon={<ChangeQuestionIcon size={48} />}
          label={t("assistants.changeQuestion")}
        />

        {/* 2. Skip Question */}
        <AssistantButton
          onClick={() => skipQuestionMutation.mutate()}
          isLoading={skipQuestionMutation.isPending}
          isDisabled={isAssistantDisabled(
            "SkipQuestion",
            !!gameStore?.usedSkipQuestionTeamOne,
            !!gameStore?.usedSkipQuestionTeamTwo,
            context === "gameboard"
          )}
          variant="light-orange-gradient"
          icon={<SkipQuestionIcon size={48} />}
          label={t("assistants.skipQuestion")}
        />

        {/* 3. Use Silence */}
        <AssistantButton
          onClick={() =>
            context === "gameboard"
              ? handleAssistantClick("UseSilence")
              : silenceMutation.mutate()
          }
          isLoading={silenceMutation.isPending}
          isDisabled={isAssistantDisabled(
            "UseSilence",
            !!gameStore?.usedSilenceTeamOne,
            !!gameStore?.usedSilenceTeamTwo,
            context === "question"
          )}
          variant="primary"
          icon={
            <Image
              alt="silence"
              width={48}
              height={48}
              src="/icons/redCard.svg"
            />
          }
          label={t("assistants.silence")}
        />

        {/* 4. Fifty Fifty (Remove2Options) */}
        <AssistantButton
          onClick={() => fiftyFiftyMutation.mutate()}
          isLoading={fiftyFiftyMutation.isPending}
          isDisabled={isAssistantDisabled(
            "Remove2Options",
            !!gameStore?.usedRemoveOptionTeamOne,
            !!gameStore?.usedRemoveOptionTeamTwo,
            context === "gameboard"
          )}
          variant="light-purple-gradient"
          icon={<FiftyByFiftyIcon size={48} />}
          label={t("assistants.fiftyFifty")}
        />

        {/* 5. Double Points */}
        <AssistantButton
          onClick={() => handleAssistantClick("DoublePoints")}
          isLoading={false}
          isDisabled={isAssistantDisabled(
            "DoublePoints",
            !!gameStore?.usedDoublePointTeamOne,
            !!gameStore?.usedDoublePointTeamTwo,
            context === "question"
          )}
          variant="magenta-gradient"
          icon={<DoublePointsIcon size={48} />}
          label={t("assistants.doublePoints")}
        />

        {/* 6. Take Points */}
        <AssistantButton
          onClick={() => handleAssistantClick("TakePoints")}
          isLoading={false}
          isDisabled={isAssistantDisabled(
            "TakePoints",
            !!gameStore?.usedTakePointsTeamOne,
            !!gameStore?.usedTakePointsTeamTwo,
            context === "question"
          )}
          variant="orange-gradient"
          icon={<TakePointsIcon size={48} />}
          label={t("assistants.takePoints")}
        />
      </div>
    </div>
  );
}
