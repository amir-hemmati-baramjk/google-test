"use client";

import { Button } from "@/app/[locale]/_components/button/button";
import { useGameStore } from "@/stores/gameStore";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Media from "../../_component/mediaComponent/Media";
import { useTranslations } from "next-intl";

export default function QuestionComponent() {
  const t = useTranslations("questionPage");
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState(0);
  const { questionId } = useParams();

  const { setAnswer, findQuestionById } = useGameStore();

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
        className="text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-[900] text-primary text-center my-3 lg:mt-5"
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
      <div className="w-full px-3 sm:px-10 m-auto absolute -bottom-5 sm:-bottom-5 left-0 flex justify-between items-center">
        <Button
          onClick={handleShowAnswer}
          variant="secondary"
          className="!font-[700] !py-1.5 lg:!py-1 !rounded-[6px] !text-md sm:!text-base xs:!px-6 sm:!px-4 md:!text-lg lg:!text-2xl xl:!text-3xl"
        >
          {t("answer")}
        </Button>
      </div>
    </>
  );
}
