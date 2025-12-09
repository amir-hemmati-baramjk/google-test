import { create } from "zustand";
import { Game, Question } from "@/type/api/game/game.type";

interface GameState extends Game {
  answer: string | null;
  whoAnswer: string | null;
  setAnswer: (value: string) => void;
  clearAnswer: () => void;
  setWhoAnswer: (value: string) => void;
  clearWhoAnswer: () => void;
  setGame: (game: Game) => void;
  setScrollX: (x: number) => void;
  findQuestionById: (id: string) => Question | undefined;
  changeQuestion: (
    gameId: string,
    questionId: string,
    newQuestionData: Question,
    team: number
  ) => void;
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

  // New booleans and helpers for "can use" flags and pending query flags
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

  // pending flags (set on game page when user activates Double/Take via query)
  pendingDoublePoint: boolean;
  pendingTakePoint: boolean;
  pendingSilence: boolean;
  setPendingDoublePoint: (value: boolean) => void;
  setPendingTakePoint: (value: boolean) => void;
  setPendingSilence: (value: boolean) => void;

  // Missing setters
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

export const useGameStore = create<GameState>((set, get) => ({
  // initial state based on previous provided fields
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

  // New canUse flags defaults (true by default — adjust as needed)
  canUseRemoveTwoOption: true,
  canUseDoublePoint: true,
  canUseTakePoints: true,
  canUseSilence: true,
  canUseSkipQuestion: true,
  canUseChangeQuestion: true,
  pendingDoublePoint: false,
  pendingTakePoint: false,
  pendingSilence: false,

  // setters
  setScrollX: (x: number) => set({ scrollX: x }),

  setCanUseRemoveTwoOption: (value: boolean) =>
    set((state) => {
      if (state?.assistants?.length) {
        return {
          ...state,
          canUseRemoveTwoOption: state.assistants.includes("Remove2Options"),
        };
      } else {
        return {
          ...state,
          canUseRemoveTwoOption: value,
        };
      }
    }),

  setCanUseDoublePoint: (value: boolean) =>
    set((state) => {
      if (state?.assistants?.length) {
        return {
          ...state,
          canUseDoublePoint: state.assistants.includes("DoublePoints"),
        };
      } else {
        return {
          ...state,
          canUseDoublePoint: value,
        };
      }
    }),

  setCanUseTakePoints: (value: boolean) =>
    set((state) => {
      if (state?.assistants?.length) {
        return {
          ...state,
          canUseTakePoints: state.assistants.includes("TakePoints"),
        };
      } else {
        return {
          ...state,
          canUseTakePoints: value,
        };
      }
    }),

  setCanUseSilence: (value: boolean) =>
    set((state) => {
      if (state?.assistants?.length) {
        return {
          ...state,
          canUseSilence: state.assistants.includes("UseSilence"),
        };
      } else {
        return {
          ...state,
          canUseSilence: value,
        };
      }
    }),

  setCanUseSkipQuestion: (value: boolean) =>
    set((state) => {
      if (state?.assistants?.length) {
        return {
          ...state,
          canUseSkipQuestion: state.assistants.includes("SkipQuestion"),
        };
      } else {
        return {
          ...state,
          canUseSkipQuestion: value,
        };
      }
    }),

  setCanUseChangeQuestion: (value: boolean) =>
    set((state) => {
      if (state?.assistants?.length) {
        return {
          ...state,
          canUseChangeQuestion: state.assistants.includes("ChangeQuestion"),
        };
      } else {
        return {
          ...state,
          canUseChangeQuestion: value,
        };
      }
    }),

  setPendingDoublePoint: (value: boolean) => set({ pendingDoublePoint: value }),
  setPendingTakePoint: (value: boolean) => set({ pendingTakePoint: value }),
  setPendingSilence: (value: boolean) => set({ pendingSilence: value }),

  // Missing setters
  setUsedDoublePointTeamOne: (value: boolean) =>
    set((state) => ({ ...state, usedDoublePointTeamOne: value })),
  setUsedDoublePointTeamTwo: (value: boolean) =>
    set((state) => ({ ...state, usedDoublePointTeamTwo: value })),
  setUsedTakePointsTeamOne: (value: boolean) =>
    set((state) => ({ ...state, usedTakePointsTeamOne: value })),
  setUsedTakePointsTeamTwo: (value: boolean) =>
    set((state) => ({ ...state, usedTakePointsTeamTwo: value })),
  setUsedSilenceTeamOne: (value: boolean) =>
    set((state) => ({ ...state, usedSilenceTeamOne: value })),
  setUsedSilenceTeamTwo: (value: boolean) =>
    set((state) => ({ ...state, usedSilenceTeamTwo: value })),
  setUsedChangeQuestionTeamOne: (value: boolean) =>
    set((state) => ({ ...state, usedChangeQuestionTeamOne: value })),
  setUsedChangeQuestionTeamTwo: (value: boolean) =>
    set((state) => ({ ...state, usedChangeQuestionTeamTwo: value })),
  setUsedSkipQuestionTeamOne: (value: boolean) =>
    set((state) => ({ ...state, usedSkipQuestionTeamOne: value })),
  setUsedSkipQuestionTeamTwo: (value: boolean) =>
    set((state) => ({ ...state, usedSkipQuestionTeamTwo: value })),
  setUsedRemoveOptionTeamOne: (value: boolean) =>
    set((state) => ({ ...state, usedRemoveOptionTeamOne: value })),
  setUsedRemoveOptionTeamTwo: (value: boolean) =>
    set((state) => ({ ...state, usedRemoveOptionTeamTwo: value })),

  // core functions (as before)
  setGame: (game) => set(game),
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

  changeTurn: (gameId, newTurn) => {
    set((state) => {
      if (state.id !== gameId) return state;
      const nextTurn =
        newTurn !== undefined ? newTurn : state.turn === 1 ? 2 : 1;

      return {
        ...state,
        turn: nextTurn,
        isSilenceInThisTurn: false,
        isDoublePointInThisTurn: false,
        isTeamOneSilenceInThisTurn: false,
        isTeamTwoSilenceInThisTurn: false,
      };
    });
  },

  changeQuestion: (gameId, questionId, newQuestionData, team) => {
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
    });
  },

  removeTwoAnswerForMultipleChoiceQuestioon: (
    gameId,
    questionId,
    newQuestionData,
    team
  ) => {
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
    });
  },

  changeTakePoint: (gameId, team) => {
    set((state) => {
      if (state.id !== gameId) return state;
      return {
        ...state,
        usedTakePointsTeamOne: team === 1 ? true : state.usedTakePointsTeamOne,
        usedTakePointsTeamTwo: team === 2 ? true : state.usedTakePointsTeamTwo,
      };
    });
  },

  changeSkipQuestion: (gameId, team, questionId) => {
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
    });
  },

  whoAnswered: (gameId, questionId, data) => {
    set((state) => {
      const updatedGame = { ...state, ...data };

      const updatedCategories = state.categories.map((cat) => {
        const updatedQuestions = cat.questions.map((q) =>
          q.id === questionId ? { ...q, isAnswered: true } : q
        );
        const answeredCount = updatedQuestions.filter(
          (q) => q.isAnswered
        ).length;

        return {
          ...cat,
          questions: updatedQuestions,
          allQuestionAnswered: answeredCount === updatedQuestions.length,
        };
      });

      const allCategoriesAnswered = updatedCategories.every(
        (cat) => cat.allQuestionAnswered
      );

      return {
        ...updatedGame,
        categories: updatedCategories,
        isGameFinished: allCategoriesAnswered,
      };
    });
  },

  useSilence: (gameId, team) => {
    set((state) => {
      if (state.id !== gameId) return state;

      const isTeamOne = team === 1;
      const isTeamTwo = team === 2;

      return {
        ...state,
        usedSilenceTeamOne: isTeamOne ? true : state.usedSilenceTeamOne,
        usedSilenceTeamTwo: isTeamTwo ? true : state.usedSilenceTeamTwo,
        isSilenceInThisTurn: true,
        isTeamOneSilenceInThisTurn: isTeamOne
          ? true
          : state.isTeamOneSilenceInThisTurn,
        isTeamTwoSilenceInThisTurn: isTeamTwo
          ? true
          : state.isTeamTwoSilenceInThisTurn,
        silenceTurnTeamOne: isTeamOne ? state.turn : state.silenceTurnTeamOne,
        silenceTurnTeamTwo: isTeamTwo ? state.turn : state.silenceTurnTeamTwo,
      };
    });
  },
}));
