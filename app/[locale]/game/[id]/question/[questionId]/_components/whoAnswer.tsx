"use client";

import { Button } from "@/app/[locale]/_components/button/button";
import { useGameStore } from "@/stores/gameStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { whoAnswerPayload } from "@/type/api/game/game.type";
import { postWhoAnswer } from "@/core/game/who-answer-service";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";

export default function WhoAnsweredComponent() {
  const { questionId } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();
  // Get data directly from Zustand
  const {
    clearWhoAnswer,
    teamOneName,
    teamTwoName,
    id: gameId,
    clearAnswer,
    whoAnswered, // Get the whoAnswered function from store
  } = useGameStore();

  // Get question to access points and other data
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

  // React Query mutation for who answered
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
        // Call the whoAnswered function from Zustand store
        if (question) {
          whoAnswered(
            gameId,
            Array.isArray(questionId) ? questionId[0] : questionId || "",
            data.data
          );
        }
        // Invalidate and refetch any related queries
        queryClient.invalidateQueries({ queryKey: ["game", gameId] });
        // Clear who answer state
        clearWhoAnswer();
        clearAnswer();
        router.replace(`/game/${gameId}`);
      } else {
        toast.error(data?.errors);
      }
    },
    onError: (error) => {
      // Handle mutation error
      console.error("Mutation error:", error);
    },
  });

  const handleTeamOneAnswer = () => {
    whoAnsweredMutation.mutate(1); // Team 1
  };

  const handleTeamTwoAnswer = () => {
    whoAnsweredMutation.mutate(2); // Team 2
  };

  const handleNoOneAnswer = () => {
    whoAnsweredMutation.mutate(0); // No one (adjust based on your API requirements)
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
            variant="secondary"
            size="large"
            className="!font-[700] w-1/2 disabled:opacity-50 disabled:cursor-not-allowed md:!text-lg lg:!text-2xl xl:!text-3xl"
          >
            {teamOneName}
          </Button>
          <Button
            onClick={handleTeamTwoAnswer}
            disabled={whoAnsweredMutation.isPending}
            variant="secondary"
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
          className="!font-[700] disabled:opacity-50 disabled:cursor-not-allowed md:!text-lg lg:!text-2xl xl:!text-3xl"
        >
          No One
        </Button>

        {/* Loading indicator */}
        {/* {whoAnsweredMutation.isPending && (
          <p className="text-secondary text-sm mt-2">Recording answer...</p>
        )} */}

        {/* Error message */}
        {/* {whoAnsweredMutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            Failed to record answer. Please try again.
          </p>
        )} */}
      </div>

      {/* Bottom button */}
      <div className="w-full px-3 sm:px-10 m-auto absolute -bottom-2 sm:-bottom-5 left-0 flex justify-between items-center">
        <Button
          onClick={handleReturnToAnswer}
          disabled={whoAnsweredMutation.isPending}
          variant="secondary"
          isOutline
          className="!font-[700] !py-0.5 lg:!py-1 !rounded-[6px] !text-xs sm:!text-base !xs:px-1 !sm:px-4 disabled:opacity-50 disabled:cursor-not-allowed md:!text-lg lg:!text-2xl xl:!text-3xl"
        >
          Return to Answer
        </Button>
      </div>
    </>
  );
}
