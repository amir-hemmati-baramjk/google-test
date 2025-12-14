import { httpService } from "../httpService";
import { LastCreatedGame } from "@/type/api/game/game.type";
import { ApiResponse } from "../httpSercive.types";

// NOTE: Adjusting for react-query usage, which prefers returning the data type directly.

export const getLatestUserGame = async (): Promise<LastCreatedGame | null> => {
  try {
    // Assuming ApiResponse<LastCreatedGame> is the type returned by httpService.get
    const response = await httpService.get<LastCreatedGame>(
      `/game/LastCreated`
    );

    // Return the actual LastCreatedGame object or null
    return response.success ? (response.data as LastCreatedGame) : null;
  } catch (error: any) {
    console.error("Failed to get latest game:", error);
    return null;
  }
};
