export interface Media {
  id: string;
  fileName: string;
  mimeType: string;
  mediaType: number;
  downloadUrl: string;
}
export interface Category {
  id: string;
  name: string;
  description: string | null;
  picture: Media;
  allQuestionAnswered: boolean;
  allQuestionUsed: boolean;
  hasFreeQuestions: boolean;
  dislpayOrder?: number;
}
export interface Tag {
  id: string;
  name: string;
  isShowable: boolean;
  displayOrder: number;
  categories: Category[];
}
