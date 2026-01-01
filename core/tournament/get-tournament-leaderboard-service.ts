import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";
import { LeaderboardItem } from "@/type/api/tournament/tournament.type";

export const getTournamentLeaderboard = async (
  id: string,
  pageParam: number
): Promise<ApiResponse<LeaderboardItem[]>> => {
  try {
    const response = await httpService.get<LeaderboardItem[]>(
      `/tournament/${id}/leaderboard?pageIndex=${pageParam}&pageSize=10`
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
