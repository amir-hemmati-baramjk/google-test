import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";
import { TournamentResponse } from "@/type/api/tournament/tournament.type";

export const getTournaments = async (
  type: "available",
  pageIndex: number,
  pageSize: number,
  filter: string
): Promise<ApiResponse<TournamentResponse>> => {
  try {
    let url = `/tournament/available?pageIndex=${pageIndex}&pageSize=${pageSize}`;

    const normalizedFilter = filter.toLowerCase();
    if (normalizedFilter === "inprogress") url += "&isInProgress=true";
    else if (normalizedFilter === "started") url += "&hasStarted=true";
    else if (normalizedFilter === "upcoming") url += "&isUpcoming=true";

    const response = await httpService.get<TournamentResponse>(url);

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to load tournament data",
      data: undefined,
    };
  }
};
