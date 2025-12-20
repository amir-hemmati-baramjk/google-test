export interface Media {
  id: string;
  fileName: string;
  mimeType: string;
  mediaType: number;
  downloadUrl: string;
}

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
