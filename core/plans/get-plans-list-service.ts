import { httpService } from "../httpService";
import { GamePackage } from "@/type/api/plans/plans.type";

export const getPlansForLogedInUser = async () => {
  try {
    const response = await httpService.get<GamePackage[]>(`/Package/package`);
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get plans data",
      data: undefined,
    };
  }
};
export const getPlansForGuestUser = async () => {
  try {
    const response = await httpService.get<GamePackage[]>(
      `/Package/package/guest`
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get guest plans data",
      data: undefined,
    };
  }
};
