import { Game } from "@/type/api/game/game.type";
import { httpService } from "../httpService";
import { createGame } from "@/type/api/game/createGame.types";
import { ApiResponse } from "../httpSercive.types";

export const restartGame = async (
  credentials: Omit<createGame, "assistants">,
  id: string
): Promise<ApiResponse> => {
  try {
    const response = await httpService.post(`/game/restart/${id}`, {
      ...credentials,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get game complete data",
      data: undefined,
    };
  }
};
