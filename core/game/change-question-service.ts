import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";
import { Game, Question } from "@/type/api/game/game.type";

export const putChangeQuestion = async (
  gameId: string,
  questionId: string,
  team: number
): Promise<ApiResponse<Question>> => {
  try {
    const response = await httpService.put<Question>(
      `/game/${gameId}/changequestion/${questionId}?team=${team}`,
      {}
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to change question",
      data: undefined,
    };
  }
};
