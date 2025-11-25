"use client";

import { useParams } from "next/navigation";
import React, { useMemo } from "react";

import { useGameStore } from "@/stores/gameStore";
import TopBar from "./_components/topBar";
import QuestionComponent from "./_components/question";
import AnswerComponent from "./_components/answer";
import WhoAnsweredComponent from "./_components/whoAnswer";

export default function Page() {
  const { questionId } = useParams();

  // Get Zustand state
  const { answer, whoAnswer } = useGameStore();

  // validate questionId from URL
  const validQuestionId = useMemo(() => {
    if (!questionId) return null;
    return Array.isArray(questionId) ? questionId[0] : questionId;
  }, [questionId]);

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
        {/* Top bar - always visible */}
        <TopBar questionPoints={question.points} />

        {/* Conditional rendering based on state */}
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
