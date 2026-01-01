import {
  TournamentStore,
  Question,
} from "@/type/api/tournament/tournament.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTournamentStore = create<TournamentStore>()(
  persist(
    (set, get) => ({
      tournament: null,
      questions: [],
      currentQuestionIndex: 0,
      questionAnswers: {},

      setTournament: (data) => set({ tournament: data }),
      setQuestions: (data) => set({ questions: data }),

      setAnswered: (id) => {
        const updated = get().questions.map((q) =>
          q.id === id ? { ...q, isAnswered: true } : q
        );
        set({ questions: updated });
      },

      setQuestionAnswer: (questionId, optionId) =>
        set((state) => ({
          questionAnswers: {
            ...state.questionAnswers,
            [questionId]: optionId,
          },
        })),

      goToNextQuestion: () => {
        const next = get().currentQuestionIndex + 1;
        if (next < get().questions.length) {
          set({ currentQuestionIndex: next });
        }
      },

      goToPreviousQuestion: () => {
        const prev = get().currentQuestionIndex - 1;
        if (prev >= 0) {
          set({ currentQuestionIndex: prev });
        }
      },

      checkIfFinished: () => {
        const { questions, tournament } = get();
        if (!tournament || questions.length === 0) return;
        const lastQuestion = questions[questions.length - 1];
        if (lastQuestion.isAnswered) {
          set({
            tournament: { ...tournament, isFinishedByUser: true },
          });
        }
      },

      reset: () =>
        set({
          tournament: null,
          questions: [],
          currentQuestionIndex: 0,
          questionAnswers: {},
        }),
    }),
    {
      name: "tournament-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
