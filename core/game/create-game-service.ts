import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types"; // Corrected import path (assuming type is correctly defined)
import { CategoryItem, createGame } from "@/type/api/game/createGame.types";

export const createGameService = async (
  credentials: createGame & {
    categoryIds: CategoryItem[];
    assistants: string[];
  }
): Promise<ApiResponse> => {
  try {
    // Note: formattedData is identical to credentials, but kept for consistency
    const formattedData = {
      ...credentials,
    };

    // Assumed return type of httpService.post is ApiResponse
    const response = await httpService.post("/game", formattedData);

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed To create game",
      data: undefined,
    };
  }
};
