"use client";

import { Button } from "@/app/[locale]/_components/button/button";
import { useGameStore } from "@/stores/gameStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { whoAnswerPayload } from "@/type/api/game/game.type";
import { postWhoAnswer } from "@/core/game/who-answer-service";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function WhoAnsweredComponent() {
  const { questionId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations("questionPage");

  const {
    clearWhoAnswer,
    teamOneName,
    teamTwoName,
    id: gameId,
    clearAnswer,
    whoAnswered,
  } = useGameStore();

  const question = useGameStore((state) => {
    const validQuestionId = questionId
      ? Array.isArray(questionId)
        ? questionId[0]
        : questionId
      : null;
    return validQuestionId
      ? state.findQuestionById(validQuestionId)
      : undefined;
  });

  const whoAnsweredMutation = useMutation({
    mutationFn: (team: number) => {
      const payload: whoAnswerPayload = {
        GameId: gameId,
        QuestionId: Array.isArray(questionId)
          ? questionId[0]
          : questionId || "",
        Team: team,
      };
      return postWhoAnswer(payload);
    },
    onSuccess: (data, team) => {
      if (data.success && data.data) {
        if (question) {
          whoAnswered(
            gameId,
            Array.isArray(questionId) ? questionId[0] : questionId || "",
            data.data,
            team
          );
        }
        router.replace(`/game/${gameId}`);
        setTimeout(() => {
          clearAnswer();
          clearWhoAnswer();
        }, 1000);
      } else {
        toast.error(data?.errors);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleTeamOneAnswer = () => {
    whoAnsweredMutation.mutate(1);
  };

  const handleTeamTwoAnswer = () => {
    whoAnsweredMutation.mutate(2);
  };

  const handleNoOneAnswer = () => {
    whoAnsweredMutation.mutate(0);
  };

  const handleReturnToAnswer = () => {
    clearWhoAnswer();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 w-full max-w-[600px] h-full m-auto">
        <div className="w-full flex justify-center items-center gap-2">
          <Button
            onClick={handleTeamOneAnswer}
            disabled={whoAnsweredMutation.isPending}
            variant="primary-gradient"
            size="large"
            className="!font-[700] w-1/2 disabled:opacity-50 disabled:cursor-not-allowed md:!text-lg lg:!text-2xl xl:!text-3xl"
          >
            {teamOneName}
          </Button>
          <Button
            onClick={handleTeamTwoAnswer}
            disabled={whoAnsweredMutation.isPending}
            variant="orange-gradient"
            size="large"
            className="!font-[700] w-1/2 disabled:opacity-50 disabled:cursor-not-allowed md:!text-lg lg:!text-2xl xl:!text-3xl"
          >
            {teamTwoName}
          </Button>
        </div>
        <Button
          onClick={handleNoOneAnswer}
          disabled={whoAnsweredMutation.isPending}
          variant="secondary"
          size="large"
          shape="full"
          isOutline
          className="!font-[700] disabled:opacity-50 disabled:cursor-not-allowed md:!text-lg lg:!text-2xl xl:!text-3xl !bg-gray-500 !text-white !border-gray-500"
        >
          {t("no-one")}
        </Button>
      </div>

      <div className="w-full px-3 sm:px-10 m-auto absolute -bottom-2 sm:-bottom-5 left-0 flex justify-between items-center">
        <Button
          onClick={handleReturnToAnswer}
          disabled={whoAnsweredMutation.isPending}
          variant="secondary"
          isOutline
          className="!font-[700] !py-1.5 lg:!py-1 !rounded-[6px] !text-md sm:!text-base xs:!px-6 sm:!px-4 md:!text-lg lg:!text-2xl xl:!text-3xl"
        >
          {t("back-to-answer")}
        </Button>
      </div>
    </>
  );
}
