import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";

export const changeUserLanguageService = async (
  lang: number
): Promise<ApiResponse> => {
  try {
    const response = await httpService.post("/user/language", {
      Language: lang === 1 ? 0 : 1,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Faild To Update Password",
      data: undefined,
    };
  }
};
