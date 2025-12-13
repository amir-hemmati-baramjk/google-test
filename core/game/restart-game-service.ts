import { Game } from "@/type/api/game/game.type";
import { httpService } from "../httpService";

export const restartGame = async ({ id }: { id: string }) => {
  try {
    const response = await httpService.get(`/game/restart/${id}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get game complete data",
      data: undefined,
    };
  }
};
