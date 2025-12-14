// Define Types
export type Media = {
  id: string;
  fileName: string;
  mimeType: string;
  mediaType: number;
  downloadUrl: string;
};

export type Option = {
  id: string;
  displayOrder: number;
  englishText: string | null;
  arabicText: string | null;
  media: Media | null;
  mediaId: string | null;
  text?: string | null;
  isDisabled?: boolean | null;
};

export type Question = {
  id: string;
  text: string;
  answer: string;
  points: number;
  time: number;
  isAnswered: boolean;
  answerType: 1 | 2;
  questionMedia: Media | null;
  answerMedia: Media | null;
  correctOption: Option | null;
  options: Option[];
  answerNote: string;
};

export type Category = {
  id: string;
  name: string;
  description: string | null;
  picture: Media;
  questions: Question[];
  allQuestionAnswered: boolean;
  allQuestionUsed: boolean;
  hasFreeQuestions: boolean;
  dislpayOrder?: number;
};

export type Game = {
  id: string;
  name: string;
  teamOneName: string;
  teamOnePlayerCount: number;
  teamOnePoints: number;
  teamTwoName: string;
  teamTwoPlayerCount: number;
  teamTwoPoints: number;
  turn: number;
  usedReverseStrikeTeamOne: boolean;
  usedCallFriendTeamOne: boolean;
  usedAnswerTwiceTeamOne: boolean;
  usedChangeQuestionTeamOne: boolean;
  usedDoublePointTeamOne: boolean;
  usedSilenceTeamOne: boolean;
  silenceTurnTeamOne: number;
  usedReverseStrikeTeamTwo: boolean;
  usedCallFriendTeamTwo: boolean;
  usedAnswerTwiceTeamTwo: boolean;
  usedChangeQuestionTeamTwo: boolean;
  usedDoublePointTeamTwo: boolean;
  usedSilenceTeamTwo: boolean;
  silenceTurnTeamTwo: number;
  isGameFinished: boolean;
  isSilenceInThisTurn: boolean;
  isDoublePointInThisTurn: boolean;
  isTeamOneSilenceInThisTurn: boolean;
  isTeamTwoSilenceInThisTurn: boolean;
  usedTakePointsTeamOne: boolean;
  usedTakePointsTeamTwo: boolean;
  usedSkipQuestionTeamOne: boolean;
  usedSkipQuestionTeamTwo: boolean;
  canContinue: boolean;
  usedRemoveOptionTeamOne: boolean;
  usedRemoveOptionTeamOneQuestionId: string | null;
  usedRemoveOptionTeamTwo: boolean;
  usedRemoveOptionTeamTwoQuestionId: string | null;
  categories: Category[];
  scrollX?: number;
  assistants?: string[] | null;
  time200: number | null;
  time400: number | null;
  time600: number | null;
};
export type whoAnswerPayload = {
  GameId: string;
  QuestionId: string;
  Team: number;
};
export type GameListResponse = {
  success: boolean;
  data: Game[];
  errors?: string;
};
export interface LastCreatedGame {
  id: string;
  name: string;
  teamOneName: string;
  teamOnePlayerCount: number;
  teamOnePoints: number;
  teamTwoName: string;
  teamTwoPlayerCount: number;
  teamTwoPoints: number;
  turn: number;
  usedReverseStrikeTeamOne: boolean;
  usedCallFriendTeamOne: boolean;
  usedAnswerTwiceTeamOne: boolean;
  usedChangeQuestionTeamOne: boolean;
  usedDoublePointTeamOne: boolean;
  usedTakePointsTeamOne: boolean;
  usedSilenceTeamOne: boolean;
  silenceTurnTeamOne: number;
  usedReverseStrikeTeamTwo: boolean;
  usedCallFriendTeamTwo: boolean;
  usedAnswerTwiceTeamTwo: boolean;
  canContinue: boolean;
  usedSilenceTeamTwo: boolean;
  silenceTurnTeamTwo: number;
  usedChangeQuestionTeamTwo: boolean;
  usedDoublePointTeamTwo: boolean;
  usedTakePointsTeamTwo: boolean;
  isSilenceInThisTurn: boolean;
  isDoublePointInThisTurn: boolean;
  categories: any | null;
  isGameFinished: boolean;
  isTeamOneSilenceInThisTurn: boolean;
  isTeamTwoSilenceInThisTurn: boolean;
  usedSkipQuestionTeamOne: boolean;
  usedSkipQuestionTeamTwo: boolean;
  assistants: string[];
  time200: number;
  time400: number;
  time600: number;
}
