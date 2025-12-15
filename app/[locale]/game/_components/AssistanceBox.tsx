// components/AssistanceBox.tsx
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
  const gameStore = useGameStore.getState();

  // --- Mutations for Question Assistants ---
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
  const isChangeQuestionLoading = changeQuestionMutation.isPending;

  const skipQuestionMutation = useMutation({
    mutationFn: () => {
      if (!questionId) throw new Error("Question ID missing");
      return putSkipQuestion(gameId, questionId);
    },
    onSuccess: () => {
      toast.success(t("assistants.questionSkipped"));
    },
  });
  const isSkipQuestionLoading = skipQuestionMutation.isPending;

  const silenceMutation = useMutation({
    mutationFn: () => {
      return putSilence(gameId);
    },
    onSuccess: () => toast.success(t("assistants.silenceApplied")),
  });
  const isSilenceLoading = silenceMutation.isPending;

  const fiftyFiftyMutation = useMutation({
    mutationFn: () => {
      if (!questionId) throw new Error("Question ID missing");
      return putFiftyFifty(gameId, questionId);
    },
    onSuccess: () => toast.success(t("assistants.fiftyFiftyUsed")),
  });
  const isFiftyFiftyLoading = fiftyFiftyMutation.isPending;

  // --- Handler functions ---
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
      toast.info(t("gameboard.selectQuestionAssistant"));
      router.push(`/game/${gameId}`);
    }
  };

  // --- Helper function to check if assistant is disabled ---
  const isAssistantDisabled = (
    canUse: boolean,
    usedTeamOne: boolean,
    usedTeamTwo: boolean,
    assistantName: string
  ): boolean => {
    if (!canUse) return true;
    if (turn !== team) return true;
    if (team === 1 && usedTeamOne) return true;
    if (team === 2 && usedTeamTwo) return true;
    if (answer || whoAnswer) return true;
    return false;
  };

  // --- Assistant Button Component ---
  interface AssistantButtonProps {
    onClick: () => void;
    isLoading: boolean;
    isDisabled: boolean;
    variant: string;
    icon: React.ReactNode;
    label: string;
    className?: string;
  }

  const AssistantButton: React.FC<AssistantButtonProps> = ({
    onClick,
    isLoading,
    isDisabled,
    variant,
    icon,
    label,
    className = "",
  }) => (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      disabled={isDisabled}
      className={`!p-1 !rounded-[5px] w-9 h-9 sm:w-7 sm:h-7  lg:w-10 lg:h-10 xl:w-14 xl:h-14 ${className}`}
      variant={variant as any}
      shape="square"
      title={label}
    >
      {icon}
    </Button>
  );

  return (
    <div className="flex flex-col items-center gap-2">
      <p className={`font-bold  ${questionId ? "hidden" : "text-secondary"}`}>
        {t("gameboard.assistance")}
      </p>
      <div
        className={` ${
          questionId
            ? "grid grid-cols-3 md:grid-cols-6 gap-2"
            : "grid grid-cols-3 gap-2"
        }`}
      >
        {context === "question" ? (
          // Question Context Assistants
          <>
            <AssistantButton
              onClick={handleChangeQuestion}
              isLoading={isChangeQuestionLoading}
              isDisabled={isAssistantDisabled(
                gameStore?.canUseChangeQuestion || false,
                gameStore?.usedChangeQuestionTeamOne || false,
                gameStore?.usedChangeQuestionTeamTwo || false,
                "changeQuestion"
              )}
              variant="light-blue-gradient"
              icon={<ChangeQuestionIcon size={48} />}
              label={t("assistants.changeQuestion")}
            />
            <AssistantButton
              onClick={handleSkipQuestion}
              isLoading={isSkipQuestionLoading}
              isDisabled={isAssistantDisabled(
                gameStore?.canUseSkipQuestion || false,
                gameStore?.usedSkipQuestionTeamOne || false,
                gameStore?.usedSkipQuestionTeamTwo || false,
                "skipQuestion"
              )}
              variant="light-orange-gradient"
              icon={<SkipQuestionIcon size={48} />}
              label={t("assistants.skipQuestion")}
            />
            <AssistantButton
              onClick={handleSilence}
              isLoading={isSilenceLoading}
              isDisabled={true} // Silence disabled in question context
              variant="primary"
              icon={
                <Image
                  alt="red card icons"
                  width={48}
                  height={48}
                  src={"/icons/redCard.svg"}
                />
              }
              label={t("assistants.silence")}
            />
            <AssistantButton
              onClick={handleFiftyFifty}
              isLoading={isFiftyFiftyLoading}
              isDisabled={isAssistantDisabled(
                gameStore?.canUseRemoveTwoOption || false,
                gameStore?.usedRemoveOptionTeamOne || false,
                gameStore?.usedRemoveOptionTeamTwo || false,
                "fiftyFifty"
              )}
              variant="light-purple-gradient"
              icon={<FiftyByFiftyIcon size={48} />}
              label={t("assistants.fiftyFifty")}
            />
            <AssistantButton
              onClick={() => {}} // No action in question context
              isLoading={false}
              isDisabled={true}
              variant="magenta-gradient"
              icon={<DoublePointsIcon size={48} />}
              label={t("assistants.doublePoints")}
            />
            <AssistantButton
              onClick={() => {}} // No action in question context
              isLoading={false}
              isDisabled={true}
              variant="orange-gradient"
              icon={<TakePointsIcon size={48} />}
              label={t("assistants.takePoints")}
            />
          </>
        ) : (
          // Gameboard Context Assistants
          <>
            <AssistantButton
              onClick={handleChangeQuestion}
              isLoading={isChangeQuestionLoading}
              isDisabled={true} // Change question disabled in gameboard
              variant="light-blue-gradient"
              icon={<ChangeQuestionIcon size={48} />}
              label={t("assistants.changeQuestion")}
            />
            <AssistantButton
              onClick={handleSkipQuestion}
              isLoading={isSkipQuestionLoading}
              isDisabled={true} // Skip question disabled in gameboard
              variant="light-orange-gradient"
              icon={<SkipQuestionIcon size={48} />}
              label={t("assistants.skipQuestion")}
            />
            <AssistantButton
              onClick={() => handleAssistantClick("silence")}
              isLoading={isSilenceLoading}
              isDisabled={isAssistantDisabled(
                gameStore?.canUseSilence || false,
                gameStore?.usedSilenceTeamOne || false,
                gameStore?.usedSilenceTeamTwo || false,
                "silence"
              )}
              variant="primary"
              icon={
                <Image
                  alt="red card icons"
                  width={48}
                  height={48}
                  src={"/icons/redCard.svg"}
                />
              }
              label={t("assistants.silence")}
            />
            <AssistantButton
              onClick={handleFiftyFifty}
              isLoading={isFiftyFiftyLoading}
              isDisabled={true} // 50/50 disabled in gameboard
              variant="light-purple-gradient"
              icon={<FiftyByFiftyIcon size={48} />}
              label={t("assistants.fiftyFifty")}
            />
            <AssistantButton
              onClick={() => handleAssistantClick("doublePoint")}
              isLoading={false}
              isDisabled={isAssistantDisabled(
                gameStore?.canUseDoublePoint || false,
                gameStore?.usedDoublePointTeamOne || false,
                gameStore?.usedDoublePointTeamTwo || false,
                "doublePoint"
              )}
              variant="magenta-gradient"
              icon={<DoublePointsIcon size={48} />}
              label={t("assistants.doublePoints")}
            />
            <AssistantButton
              onClick={() => handleAssistantClick("takePoint")}
              isLoading={false}
              isDisabled={isAssistantDisabled(
                gameStore?.canUseTakePoints || false,
                gameStore?.usedTakePointsTeamOne || false,
                gameStore?.usedTakePointsTeamTwo || false,
                "takePoint"
              )}
              variant="orange-gradient"
              icon={<TakePointsIcon size={48} />}
              label={t("assistants.takePoints")}
            />
          </>
        )}
      </div>
    </div>
  );
}
