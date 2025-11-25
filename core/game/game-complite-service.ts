import { Game } from "@/type/api/game/game.type";
import { httpService } from "../httpService";
import { Tag } from "@/type/api/categories/categories.type";

export const getGameComplete = async ({ id }: { id: string }) => {
  try {
    const response = await httpService.get<Game>(`/game/${id}/complete`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get game complete data",
      data: undefined,
    };
  }
};
