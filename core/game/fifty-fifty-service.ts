import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";
import { Question } from "@/type/api/game/game.type";

export const putFiftyFifty = async (
  gameId: string,
  questionId: string,
  team: number
): Promise<ApiResponse<Question>> => {
  try {
    const response = await httpService.put<Question>(
      `/game/${gameId}/removeTwoAnswerForMultipleChoiceQuestioon/${questionId}?team=${team}`,
      {}
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to use 50/50",
      data: undefined,
    };
  }
};
