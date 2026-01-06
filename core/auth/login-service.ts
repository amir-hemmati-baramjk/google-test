import {
  accessTokenLs,
  isLoginLS,
  refreshTokenLS,
} from "@/localeStorage/storage";
import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";
import { LoginResponse, SignIn } from "@/type/api/auth/auth.types";

export const loginUser = async (
  credentials: SignIn
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const formattedData = {
      ...credentials,
      userName: `${credentials.userName}`,
    };

    const response = await httpService.post<LoginResponse>(
      "/auth/login",
      formattedData
    );

    if (response.success && response.data) {
      refreshTokenLS.set(response.data.refreshToken);
      accessTokenLs.set(response.data.accessToken);
    }

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Login failed",
      data: undefined,
    };
  }
};
