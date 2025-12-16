import {
  initPaymentResponse,
  PaymentGateway,
} from "@/type/api/payment/payment.type";
import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";

export const initPaymentGateways = async (
  packageId: string
): Promise<ApiResponse> => {
  try {
    const response = await httpService.post<{ PackageId: string }>(
      "/payment/init",
      { PackageId: packageId }
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to retrieve payment gateways",
      data: undefined,
    };
  }
};
