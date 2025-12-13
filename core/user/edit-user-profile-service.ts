import { httpService } from "../httpService";

import { ApiResponse } from "../httpSercive.types";
import { editProfile } from "@/type/api/profile/profile.types";

export const editProfileService = async (
  credentials: editProfile
): Promise<ApiResponse> => {
  try {
    const formattedData = {
      ...credentials,
    };

    const response = await httpService.post("/user/profile", formattedData);

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Faild To Update Profile",
      data: undefined,
    };
  }
};
