"use client";
import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/app/[locale]/_components/button/button";
import Media from "@/app/[locale]/game/[id]/question/_component/mediaComponent/Media";
import { useRouter } from "@/i18n/navigation";
import { useTournamentStore } from "@/stores/tournamentStore";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { answerTournamentQuestion } from "@/core/tournament/post-answer-question-service";
import { toast } from "react-toastify";

export default function Page() {
  const t = useTranslations("tournament");
  const { questionId, id } = useParams<{ questionId: string; id: string }>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const {
    tournament,
    questions,
    setAnswered,
    setQuestionAnswer,
    goToNextQuestion,
  } = useTournamentStore();
  const question = questions.find((q) => q.id === questionId);

  const handleConfirm = () => {
    if (!selectedOptionId || !question || !tournament) return;
    const currentIndex = questions.findIndex((q) => q.id === question.id);
    const nextQuestion = questions[currentIndex + 1];

    setAnswered(question.id);
    setQuestionAnswer(question.id, selectedOptionId);

    if (nextQuestion) {
      goToNextQuestion();
      router.replace(`/tournament/${id}/${nextQuestion.id}`);
    } else {
      router.replace(`/tournament/${id}/leaderboard`);
    }

    startTransition(async () => {
      const res = await answerTournamentQuestion(
        tournament.id,
        question.id,
        selectedOptionId
      );
      if (!res?.success) toast.error(res?.message || "Error");
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-3 bg-light-purple rounded-[16px] mt-5">
          <div className="bg-app-bg rounded-[16px] flex flex-col items-center justify-center p-4">
            <p className="text-center text-sm md:text-xl font-bold text-secondary">
              {question?.text}
            </p>
            <div className="w-full relative flex justify-center items-center mt-5">
              {question?.questionMedia && (
                <Media data={question.questionMedia} />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-5 mx-auto">
            {question?.options.map((option) => (
              <Button
                key={option.id}
                onClick={() => setSelectedOptionId(option?.id)}
                variant={"secondary"}
                isOutline={selectedOptionId !== option?.id}
                disabled={isPending}
                className="lg:!font-bold !text-xs lg:!text-xl !rounded-[6px] border-[2px]"
              >
                {option?.text}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-3 mx-auto">
          <Button
            variant="secondary"
            shape="full"
            onClick={handleConfirm}
            disabled={!selectedOptionId || isPending}
            isLoading={isPending}
          >
            {t("confirm")}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
