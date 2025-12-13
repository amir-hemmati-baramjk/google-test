import { Game, GameListResponse } from "@/type/api/game/game.type";
import { httpService } from "../httpService";

export const getGameList = async ({
  pageIndex,
  pageSize = 6,
}: {
  pageSize: number;
  pageIndex: number;
}): Promise<GameListResponse> => {
  try {
    const response = await httpService.get<Game[]>(
      `/game?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );

    return {
      success: true,
      data: response.data || [],
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get game List data",
      data: [],
    };
  }
};
