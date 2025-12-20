import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";
import { contactUs } from "@/type/api/contactUs/contactUs.types";

export const contactUsService = async (
  credentials: contactUs
): Promise<ApiResponse> => {
  try {
    const formattedData = {
      ...credentials,
    };
    const response = await httpService.post("/contactus", formattedData);

    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed To create game",
      data: undefined,
    };
  }
};
