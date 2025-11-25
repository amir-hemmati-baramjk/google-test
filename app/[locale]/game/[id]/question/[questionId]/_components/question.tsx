"use client";

import { Button } from "@/app/[locale]/_components/button/button";
import { useGameStore } from "@/stores/gameStore";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Media from "../../_component/mediaComponent/Media";

export default function QuestionComponent() {
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState(0);
  const { questionId } = useParams();

  // Get data directly from Zustand
  const { setAnswer, findQuestionById } = useGameStore();

  // Get current question
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

  // Measure text height
  useEffect(() => {
    if (textRef.current && question?.text) {
      setTextHeight(textRef.current.offsetHeight);
    }
  }, [question?.text]);

  const handleShowAnswer = () => {
    setAnswer("yes");
  };

  if (!question) return null;

  return (
    <>
      <p
        ref={textRef}
        className="text-sm md:text-lg lg:text-xl xl:text-2xl font-[900] text-primary text-center my-3 lg:mt-5"
      >
        {question.text}
      </p>

      {/* Media content */}
      <div
        className="flex flex-col justify-between mt-auto"
        style={{ height: `calc(90% - ${textHeight}px)` }}
      >
        {question.questionMedia && <Media data={question.questionMedia} />}
      </div>

      {/* Bottom button */}
      <div className="w-full px-3 sm:px-10 m-auto absolute -bottom-2 sm:-bottom-5 left-0 flex justify-between items-center">
        <Button
          onClick={handleShowAnswer}
          variant="secondary"
          className="!font-[700] !py-0.5 lg:!py-1 !rounded-[6px] !text-xs sm:!text-base !xs:px-1 !sm:px-4"
        >
          Answer
        </Button>
      </div>
    </>
  );
}
