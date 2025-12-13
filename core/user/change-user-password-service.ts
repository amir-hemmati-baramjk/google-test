import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";
import { changePass } from "@/type/api/profile/changePass.type";

export const changeUserProfileService = async (
  credentials: Omit<changePass, "ConfirmNewPassword">
): Promise<ApiResponse> => {
  try {
    const response = await httpService.post("/user/password", credentials);
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Faild To Update Password",
      data: undefined,
    };
  }
};
