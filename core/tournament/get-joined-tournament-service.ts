import { ApiResponse } from "../httpSercive.types"; // Corrected typo from your snippet
import { httpService } from "../httpService";
import { TournamentResponse } from "@/type/api/tournament/tournament.type";

export const getJoinedTournaments = async (
  pageIndex: number,
  pageSize: number,
  filter: string
): Promise<ApiResponse<TournamentResponse>> => {
  try {
    let url = `/tournament/joined?pageIndex=${pageIndex}&pageSize=${pageSize}`;

    if (filter === "inprogress") url += "&isInProgress=true";
    else if (filter === "started") url += "&hasStarted=true";
    else if (filter === "upcoming") url += "&isUpcoming=true";

    const response = await httpService.get<TournamentResponse>(url);

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to load joined tournaments",
      data: undefined,
    };
  }
};
