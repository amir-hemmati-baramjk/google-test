export type Media = {
  mediaType: number; // 0 = image, 1 = video, 2 = audio
  downloadUrl: string;
};

export interface QuestionMediaProps {
  data: Media | null;
  notPlay?: boolean;
  setShowQuestiontext?: (value: boolean) => void;
}
