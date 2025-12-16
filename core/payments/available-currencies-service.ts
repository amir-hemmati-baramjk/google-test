import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";

export const getAvailableCurrencies = async (): Promise<
  ApiResponse<{ allCournecies: string[] }>
> => {
  try {
    const response = await httpService.get<{ allCournecies: string[] }>(
      "/payment/Currencies"
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to load currencies data",
      data: undefined,
    };
  }
};
