import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";

export const deleteUserAccountService = async (): Promise<ApiResponse> => {
  try {
    const response = await httpService.delete("/user/deleteaccount");

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Faild To Delete Account",
      data: undefined,
    };
  }
};
