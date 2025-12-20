import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";

export const joinTournament = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await httpService.post(`/tournament/join/${id}`, {});
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Join request failed",
      data: undefined,
    };
  }
};
