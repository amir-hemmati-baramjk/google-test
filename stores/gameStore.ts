import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Game, Question } from "@/type/api/game/game.type";

interface GameState extends Game {
  layoutType: "version1" | "version2";
  toggleLayout: () => void;

  answer: string | null;
  whoAnswer: string | null;
  setAnswer: (value: string) => void;
  clearAnswer: () => void;
  setWhoAnswer: (value: string) => void;
  clearWhoAnswer: () => void;
  setGame: (game: Game) => void;
  setScrollX: (x: number) => void;
  findQuestionById: (id: string) => Question | undefined;
  resetGame: () => void;
  changeQuestion: (
    gameId: string,
    questionId: string,
    newQuestionData: Question,
    team: number
  ) => void;
  updateTeamPoints: (gameId: string, team: number, points: number) => void;
  removeTwoAnswerForMultipleChoiceQuestioon: (
    gameId: string,
    questionId: string,
    newQuestionData: Question,
    team: number
  ) => void;
  whoAnswered: (
    gameId: string,
    questionId: string,
    data: Omit<Game, "categories">
  ) => void;
  changeTakePoint: (gameId: string, team: number) => void;
  changeSkipQuestion: (
    gameId: string,
    team: number,
    questionId: string
  ) => void;
  changeTurn: (gameId: string, newTurn?: number) => void;
  useSilence: (gameId: string, team: number) => void;

  canUseRemoveTwoOption: boolean;
  canUseDoublePoint: boolean;
  canUseTakePoints: boolean;
  canUseSilence: boolean;
  canUseSkipQuestion: boolean;
  canUseChangeQuestion: boolean;
  setCanUseRemoveTwoOption: (value: boolean) => void;
  setCanUseDoublePoint: (value: boolean) => void;
  setCanUseTakePoints: (value: boolean) => void;
  setCanUseSilence: (value: boolean) => void;
  setCanUseSkipQuestion: (value: boolean) => void;
  setCanUseChangeQuestion: (value: boolean) => void;

  pendingDoublePoint: boolean;
  pendingTakePoint: boolean;
  pendingSilence: boolean;
  setPendingDoublePoint: (value: boolean) => void;
  setPendingTakePoint: (value: boolean) => void;
  setPendingSilence: (value: boolean) => void;

  setUsedDoublePointTeamOne: (value: boolean) => void;
  setUsedDoublePointTeamTwo: (value: boolean) => void;
  setUsedTakePointsTeamOne: (value: boolean) => void;
  setUsedTakePointsTeamTwo: (value: boolean) => void;
  setUsedSilenceTeamOne: (value: boolean) => void;
  setUsedSilenceTeamTwo: (value: boolean) => void;
  setUsedChangeQuestionTeamOne: (value: boolean) => void;
  setUsedChangeQuestionTeamTwo: (value: boolean) => void;
  setUsedSkipQuestionTeamOne: (value: boolean) => void;
  setUsedSkipQuestionTeamTwo: (value: boolean) => void;
  setUsedRemoveOptionTeamOne: (value: boolean) => void;
  setUsedRemoveOptionTeamTwo: (value: boolean) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      layoutType: "version1",
      toggleLayout: () =>
        set((state) => ({
          layoutType: state.layoutType === "version1" ? "version2" : "version1",
        })),

      answer: null,
      whoAnswer: null,
      id: "",
      name: "",
      teamOneName: "",
      teamOnePlayerCount: 0,
      teamOnePoints: 0,
      teamTwoName: "",
      teamTwoPlayerCount: 0,
      teamTwoPoints: 0,
      turn: 1,
      usedReverseStrikeTeamOne: false,
      usedCallFriendTeamOne: false,
      usedAnswerTwiceTeamOne: false,
      usedChangeQuestionTeamOne: false,
      usedDoublePointTeamOne: false,
      usedSilenceTeamOne: false,
      silenceTurnTeamOne: 0,
      usedReverseStrikeTeamTwo: false,
      usedCallFriendTeamTwo: false,
      usedAnswerTwiceTeamTwo: false,
      usedChangeQuestionTeamTwo: false,
      usedDoublePointTeamTwo: false,
      usedSilenceTeamTwo: false,
      silenceTurnTeamTwo: 0,
      isGameFinished: false,
      isSilenceInThisTurn: false,
      isDoublePointInThisTurn: false,
      isTeamOneSilenceInThisTurn: false,
      isTeamTwoSilenceInThisTurn: false,
      usedTakePointsTeamOne: false,
      usedTakePointsTeamTwo: false,
      usedSkipQuestionTeamOne: false,
      usedSkipQuestionTeamTwo: false,
      canContinue: false,
      categories: [],
      usedRemoveOptionTeamOne: false,
      usedRemoveOptionTeamOneQuestionId: null,
      usedRemoveOptionTeamTwo: false,
      usedRemoveOptionTeamTwoQuestionId: null,
      scrollX: 0,
      time200: 40,
      time400: 70,
      time600: 100,
      assistants: null,

      canUseRemoveTwoOption: true,
      canUseDoublePoint: true,
      canUseTakePoints: true,
      canUseSilence: true,
      canUseSkipQuestion: true,
      canUseChangeQuestion: true,
      pendingDoublePoint: false,
      pendingTakePoint: false,
      pendingSilence: false,

      setScrollX: (x) => set({ scrollX: x }),
      setPendingDoublePoint: (value) => set({ pendingDoublePoint: value }),
      setPendingTakePoint: (value) => set({ pendingTakePoint: value }),
      setPendingSilence: (value) => set({ pendingSilence: value }),
      resetGame: () => {
        set({
          answer: null,
          whoAnswer: null,
          teamOnePoints: 0,
          teamTwoPoints: 0,
          turn: 1,
          isGameFinished: false,
          isSilenceInThisTurn: false,
          isDoublePointInThisTurn: false,
          isTeamOneSilenceInThisTurn: false,
          isTeamTwoSilenceInThisTurn: false,

          usedChangeQuestionTeamOne: false,
          usedDoublePointTeamOne: false,
          usedSilenceTeamOne: false,
          usedTakePointsTeamOne: false,
          usedSkipQuestionTeamOne: false,
          usedRemoveOptionTeamOne: false,
          silenceTurnTeamOne: 0,

          usedChangeQuestionTeamTwo: false,
          usedDoublePointTeamTwo: false,
          usedSilenceTeamTwo: false,
          usedTakePointsTeamTwo: false,
          usedSkipQuestionTeamTwo: false,
          usedRemoveOptionTeamTwo: false,
          silenceTurnTeamTwo: 0,

          pendingDoublePoint: false,
          pendingTakePoint: false,
          pendingSilence: false,

          categories: [],
        });
      },
      setCanUseRemoveTwoOption: (value) =>
        set((state) => ({
          canUseRemoveTwoOption:
            state.assistants?.includes("Remove2Options") ?? value,
        })),
      setCanUseDoublePoint: (value) =>
        set((state) => ({
          canUseDoublePoint:
            state.assistants?.includes("DoublePoints") ?? value,
        })),
      setCanUseTakePoints: (value) =>
        set((state) => ({
          canUseTakePoints: state.assistants?.includes("TakePoints") ?? value,
        })),
      setCanUseSilence: (value) =>
        set((state) => ({
          canUseSilence: state.assistants?.includes("UseSilence") ?? value,
        })),
      setCanUseSkipQuestion: (value) =>
        set((state) => ({
          canUseSkipQuestion:
            state.assistants?.includes("SkipQuestion") ?? value,
        })),
      setCanUseChangeQuestion: (value) =>
        set((state) => ({
          canUseChangeQuestion:
            state.assistants?.includes("ChangeQuestion") ?? value,
        })),

      setUsedDoublePointTeamOne: (value) =>
        set({ usedDoublePointTeamOne: value }),
      setUsedDoublePointTeamTwo: (value) =>
        set({ usedDoublePointTeamTwo: value }),
      setUsedTakePointsTeamOne: (value) =>
        set({ usedTakePointsTeamOne: value }),
      setUsedTakePointsTeamTwo: (value) =>
        set({ usedTakePointsTeamTwo: value }),
      setUsedSilenceTeamOne: (value) => set({ usedSilenceTeamOne: value }),
      setUsedSilenceTeamTwo: (value) => set({ usedSilenceTeamTwo: value }),
      setUsedChangeQuestionTeamOne: (value) =>
        set({ usedChangeQuestionTeamOne: value }),
      setUsedChangeQuestionTeamTwo: (value) =>
        set({ usedChangeQuestionTeamTwo: value }),
      setUsedSkipQuestionTeamOne: (value) =>
        set({ usedSkipQuestionTeamOne: value }),
      setUsedSkipQuestionTeamTwo: (value) =>
        set({ usedSkipQuestionTeamTwo: value }),
      setUsedRemoveOptionTeamOne: (value) =>
        set({ usedRemoveOptionTeamOne: value }),
      setUsedRemoveOptionTeamTwo: (value) =>
        set({ usedRemoveOptionTeamTwo: value }),

      setGame: (game) => set((state) => ({ ...state, ...game })),
      setAnswer: (value) => set({ answer: value }),
      clearAnswer: () => set({ answer: null }),
      setWhoAnswer: (value) => set({ whoAnswer: value }),
      clearWhoAnswer: () => set({ whoAnswer: null }),

      findQuestionById: (id) => {
        const { categories } = get();
        for (const category of categories) {
          const found = category.questions.find((q) => q.id === id);
          if (found) return found;
        }
        return undefined;
      },

      changeTurn: (gameId, newTurn) =>
        set((state) => {
          if (state.id !== gameId) return state;
          return {
            ...state,
            turn: newTurn !== undefined ? newTurn : state.turn === 1 ? 2 : 1,
            isSilenceInThisTurn: false,
            isDoublePointInThisTurn: false,
            isTeamOneSilenceInThisTurn: false,
            isTeamTwoSilenceInThisTurn: false,
          };
        }),

      updateTeamPoints: (gameId, team, points) =>
        set((state) => {
          if (state.id !== gameId) return state;
          return team === 1
            ? { teamOnePoints: points }
            : { teamTwoPoints: points };
        }),

      changeQuestion: (gameId, questionId, newQuestionData, team) =>
        set((state) => {
          if (state.id !== gameId) return state;
          return {
            ...state,
            usedChangeQuestionTeamOne:
              team === 1 ? true : state.usedChangeQuestionTeamOne,
            usedChangeQuestionTeamTwo:
              team === 2 ? true : state.usedChangeQuestionTeamTwo,
            categories: state.categories.map((cat) => ({
              ...cat,
              questions: cat.questions.map((q) =>
                q.id === questionId ? { ...newQuestionData } : q
              ),
            })),
          };
        }),

      removeTwoAnswerForMultipleChoiceQuestioon: (
        gameId,
        questionId,
        newQuestionData,
        team
      ) =>
        set((state) => {
          if (state.id !== gameId) return state;
          return {
            ...state,
            usedRemoveOptionTeamOne:
              team === 1 ? true : state.usedRemoveOptionTeamOne,
            usedRemoveOptionTeamTwo:
              team === 2 ? true : state.usedRemoveOptionTeamTwo,
            usedRemoveOptionTeamOneQuestionId:
              team === 1 ? questionId : state.usedRemoveOptionTeamOneQuestionId,
            usedRemoveOptionTeamTwoQuestionId:
              team === 2 ? questionId : state.usedRemoveOptionTeamTwoQuestionId,
            categories: state.categories.map((cat) => ({
              ...cat,
              questions: cat.questions.map((q) =>
                q.id === questionId ? { ...newQuestionData } : q
              ),
            })),
          };
        }),

      changeTakePoint: (gameId, team) =>
        set((state) => {
          if (state.id !== gameId) return state;
          return {
            ...state,
            usedTakePointsTeamOne:
              team === 1 ? true : state.usedTakePointsTeamOne,
            usedTakePointsTeamTwo:
              team === 2 ? true : state.usedTakePointsTeamTwo,
          };
        }),

      changeSkipQuestion: (gameId, team, questionId) =>
        set((state) => {
          if (state.id !== gameId) return state;
          const question = state.categories
            .flatMap((cat) => cat.questions)
            .find((q) => q.id === questionId);
          if (!question) return state;

          const updatedPoints =
            team === 1
              ? state.teamOnePoints + question.points
              : state.teamTwoPoints + question.points;

          return {
            ...state,
            categories: state.categories.map((cat) => ({
              ...cat,
              questions: cat.questions.map((q) =>
                q.id === questionId ? { ...q, isAnswered: true } : q
              ),
            })),
            turn: state.turn === 1 ? 2 : 1,
            usedSkipQuestionTeamOne:
              team === 1 ? true : state.usedSkipQuestionTeamOne,
            usedSkipQuestionTeamTwo:
              team === 2 ? true : state.usedSkipQuestionTeamTwo,
            teamOnePoints: team === 1 ? updatedPoints : state.teamOnePoints,
            teamTwoPoints: team === 2 ? updatedPoints : state.teamTwoPoints,
          };
        }),

      whoAnswered: (gameId, questionId, data) =>
        set((state) => {
          const updatedGame = { ...state, ...data };
          const updatedCategories = state.categories.map((cat) => {
            const updatedQuestions = cat.questions.map((q) =>
              q.id === questionId ? { ...q, isAnswered: true } : q
            );
            return {
              ...cat,
              questions: updatedQuestions,
              allQuestionAnswered:
                updatedQuestions.filter((q) => q.isAnswered).length ===
                updatedQuestions.length,
            };
          });

          return {
            ...updatedGame,
            categories: updatedCategories,
            isGameFinished: updatedCategories.every(
              (cat) => cat.allQuestionAnswered
            ),
          };
        }),

      useSilence: (gameId, team) =>
        set((state) => {
          if (state.id !== gameId) return state;
          const isTeamOne = team === 1;
          return {
            ...state,
            usedSilenceTeamOne: isTeamOne ? true : state.usedSilenceTeamOne,
            usedSilenceTeamTwo: !isTeamOne ? true : state.usedSilenceTeamTwo,
            isSilenceInThisTurn: true,
            isTeamOneSilenceInThisTurn: isTeamOne
              ? true
              : state.isTeamOneSilenceInThisTurn,
            isTeamTwoSilenceInThisTurn: !isTeamOne
              ? true
              : state.isTeamTwoSilenceInThisTurn,
            silenceTurnTeamOne: isTeamOne
              ? state.turn
              : state.silenceTurnTeamOne,
            silenceTurnTeamTwo: !isTeamOne
              ? state.turn
              : state.silenceTurnTeamTwo,
          };
        }),
    }),
    {
      name: "falta-game-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
