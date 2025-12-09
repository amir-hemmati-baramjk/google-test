import { Game } from "@/type/api/game/game.type";
import { httpService } from "../httpService";

export const getChangeTurn = async ({
  team,
  points,
  id,
}: {
  team: number;
  points: number;
  id: string;
}) => {
  try {
    const response = await httpService.put<{}>(`/game/${id}/points`, {
      Team: team,
      Points: points,
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
