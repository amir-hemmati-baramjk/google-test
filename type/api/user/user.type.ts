export interface User {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  gPoint?: number;
  nPoint?: number;
  birthDay?: string;
  language?: number;
  maxCategoriesAllowed: number;
  receiveNotification?: boolean;
  completedRegistration?: boolean;
  picture?: {
    id: string;
    fileName: string;
    mimeType: string;
    mediaType: number;
    downloadUrl: string;
  };
}
