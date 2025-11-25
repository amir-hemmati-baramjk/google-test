import { accessTokenLs, refreshTokenLS } from "@/localeStorage/storage";
import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";
import { LoginResponse, SignUpWithEmail } from "@/type/api/auth/auth.types";
import { Game, whoAnswerPayload } from "@/type/api/game/game.type";

export const postWhoAnswer = async (
  credentials: whoAnswerPayload
): Promise<ApiResponse<Game>> => {
  try {
    const response = await httpService.post<Game>("/game/answer", credentials);

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Registration failed",
      data: undefined,
    };
  }
};
