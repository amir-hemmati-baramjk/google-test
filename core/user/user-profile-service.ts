import { httpService } from "../httpService";
import { userProfileApiRespone } from "./type/userProfile.type";

export const getUserProfile = async () => {
  try {
    const response = await httpService.get<userProfileApiRespone>(
      "/user/profile"
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get user profile",
      data: undefined,
    };
  }
};
