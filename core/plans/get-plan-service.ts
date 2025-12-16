import { httpService } from "../httpService";
import { GamePackage } from "@/type/api/plans/plans.type";

export const getPlansById = async ({ id }: { id: string }) => {
  try {
    const response = await httpService.get<GamePackage>(`/package/${id}`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get plans data",
      data: undefined,
    };
  }
};
