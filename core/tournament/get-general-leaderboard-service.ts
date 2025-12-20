import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";
import { LeaderboardItem } from "@/type/api/tournament/tournament.type";

export const getLeaderboard = async (): Promise<
  ApiResponse<LeaderboardItem[]>
> => {
  try {
    const response = await httpService.get<LeaderboardItem[]>(
      "/tournament/leaderboard"
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to fetch leaderboard data",
      data: undefined,
    };
  }
};
