import { Game } from "@/type/api/game/game.type";
import { httpService } from "../httpService";

export const reportQuestion = async ({
  QuestionId,
  Description,
}: {
  QuestionId: string;
  Description: string;
}) => {
  try {
    const response = await httpService.post(`/question/report`, {
      QuestionId: QuestionId,
      Description: Description,
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
