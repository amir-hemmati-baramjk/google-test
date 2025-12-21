"use client";
import React from "react";
import AssistanceBox from "../../../_components/AssistanceBox";
import { useParams, useSearchParams } from "next/navigation";
import { useGameStore } from "@/stores/gameStore";
import TeamScoreCard from "../../../_components/TeamScoreCard";

export default function GameQuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { questionId } = useParams();

  const validQuestionId = Array.isArray(questionId)
    ? questionId[0]
    : questionId;

  const { teamOneName, teamTwoName } = useGameStore();

  return (
    <div className="flex justify-center items-center gap-5 flex-col sm:flex-row p-3 h-full w-full">
      {children}
      <div className="flex flex-row sm:flex-col xl:justify-around gap-3 md:gap-10 lg:gap-20 w-full sm:w-1/3 sm:py-3">
        <div className="w-1/2 sm:w-full flex flex-col gap-2 h-full ">
          <TeamScoreCard teamName={teamOneName || "Team 1"} teamNumber={1} />
          <AssistanceBox
            team={1}
            context="question"
            questionId={validQuestionId}
          />
        </div>
        <div className="w-1/2 sm:w-full flex flex-col gap-3">
          <TeamScoreCard teamName={teamTwoName || "Team 2"} teamNumber={2} />
          <AssistanceBox
            team={2}
            context="question"
            questionId={validQuestionId}
          />
        </div>
      </div>
    </div>
  );
}
