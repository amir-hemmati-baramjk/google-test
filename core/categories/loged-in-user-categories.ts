import { httpService } from "../httpService";
import { Tag } from "@/type/api/categories/categories.type";

export const getUserTag = async () => {
  try {
    const response = await httpService.get<Tag[]>("/tag");
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get user profile",
      data: undefined,
    };
  }
};
