import { CreatePaymentRequestBody } from "@/type/api/payment/payment.type";
import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";

export const createPaymentRequest = async (
  body: CreatePaymentRequestBody
): Promise<ApiResponse> => {
  try {
    const response = await httpService.post<CreatePaymentRequestBody>(
      "/payment/payment",
      body
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Payment processing failed",
      data: undefined,
    };
  }
};
