import { Game } from "@/type/api/game/game.type";
import { httpService } from "../httpService";

export const getChangeTurn = async ({ id }: { id: string }) => {
  try {
    const response = await httpService.get<Game>(`/game/${id}/toggleTurn`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get game complete data",
      data: undefined,
    };
  }
};
