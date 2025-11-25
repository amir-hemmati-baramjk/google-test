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
  // Add the new function here
  useSilence: (gameId: string, team: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // --- Your existing initial state remains the same
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
  setScrollX: (x: number) => set({ scrollX: x }),

  // --- Your existing functions remain the same
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
