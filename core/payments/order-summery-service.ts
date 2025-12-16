import { FetchOrderSummaryBody } from "@/type/api/payment/payment.type";
import { ApiResponse } from "../httpSercive.types";
import { httpService } from "../httpService";

export const fetchOrderSummary = async (
  body: FetchOrderSummaryBody
): Promise<ApiResponse> => {
  try {
    const response = await httpService.post("/payment/orderSummary", body);

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get order summary",
      data: undefined,
    };
  }
};
