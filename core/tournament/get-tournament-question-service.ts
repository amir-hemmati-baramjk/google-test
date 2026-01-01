import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";

export const getTournamentQuestionsById = async (
  id: string
): Promise<ApiResponse> => {
  try {
    const response = await httpService.get(`/tournament/${id}/questions`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Join request failed",
      data: undefined,
    };
  }
};
