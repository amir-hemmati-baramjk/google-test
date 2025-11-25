import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";
import { Game } from "@/type/api/game/game.type";

export const putDoublePoints = async (
  gameId: string,
  team: number
): Promise<ApiResponse<Game>> => {
  try {
    const response = await httpService.put<Game>(
      `/game/${gameId}/useDoublePoint?team=${team}`,
      {}
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to activate double points",
      data: undefined,
    };
  }
};
