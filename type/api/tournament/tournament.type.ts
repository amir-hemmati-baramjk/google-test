export interface Media {
  id: string;
  fileName: string;
  mimeType: string;
  mediaType: number;
  downloadUrl: string;
}

export type Option = {
  id: string;
  displayOrder: number;
  englishText: string | null;
  arabicText: string | null;
  text: string;
  media: Media | null;
  mediaId: string | null;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
  points: number;
  time: number;
  isAnswered: boolean;
  answerType: number;
  questionMedia: Media | null;
  answerMedia: Media | null;
};

export interface Tournament {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  duration: number;
  startType: number;
  isUserJoined: boolean;
  questionCount: number;
  participantCount?: number;
  picture?: Media;
  isStarted?: boolean;
  isInProgress?: boolean;
  isFinished?: boolean;
  isFinishedByUser?: boolean;
}

export interface TournamentResponse {
  data: Tournament[];
  totalCount: number;
  pageSize: number;
  pageIndex: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface LeaderboardItem {
  rank: number;
  user: string;
  seconds: number;
  picture?: Media;
}
export type TournamentStore = {
  tournament: Tournament | null;
  questions: Question[];
  currentQuestionIndex: number;
  questionAnswers: Record<string, string>;
  setTournament: (data: Tournament) => void;
  setQuestions: (data: Question[]) => void;
  setAnswered: (id: string) => void;
  setQuestionAnswer: (questionId: string, optionId: string) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  checkIfFinished: () => void;
  reset: () => void;
};
