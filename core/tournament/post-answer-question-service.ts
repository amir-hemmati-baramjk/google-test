import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";

export const answerTournamentQuestion = async (
  TournamentId: string,
  QuestionId: string,
  SelectedOptionId: string
): Promise<ApiResponse> => {
  try {
    const response = await httpService.post("/tournament/answer", {
      TournamentId: TournamentId,
      QuestionId: QuestionId,
      SelectedOptionId: SelectedOptionId,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Join request failed",
      data: undefined,
    };
  }
};
