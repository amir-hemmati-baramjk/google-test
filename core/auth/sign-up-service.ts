import {
  accessTokenLs,
  isLoginLS,
  refreshTokenLS,
} from "@/localeStorage/storage";
import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";
import { LoginResponse, SignUpWithEmail } from "@/type/api/auth/auth.types";

export const registerWithEmail = async (
  credentials: SignUpWithEmail
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const formattedData = {
      ...credentials,
      ...(credentials.PhoneNumber && {
        PhoneNumber: `${credentials.CountryCode}${credentials.PhoneNumber}`,
      }),
    };
    const response = await httpService.post<LoginResponse>(
      "/auth/register",
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
      errors: error.message || "Registration failed",
      data: undefined,
    };
  }
};
