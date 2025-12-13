import { httpService } from "../httpService";

export interface UpdateTeamPointsParams {
  id: string;
  team: number;
  points: number;
}

export const updateTeamPoints = async ({
  id,
  team,
  points,
}: UpdateTeamPointsParams) => {
  try {
    const response = await httpService.put<{}>(`/game/${id}/points`, {
      Team: team,
      Points: points,
    });
    return {
      success: true,
      data: response.data,
      errors: null,
    };
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to update team points",
      data: undefined,
    };
  }
};
