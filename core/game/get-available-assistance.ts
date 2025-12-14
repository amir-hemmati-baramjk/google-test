// core/game/get-available-assistance.ts
import { ApiResponse } from "@/core/httpSercive.types";
import { httpService } from "../httpService";

// Assuming httpService.get<T> returns Promise<ApiResponse<T>>
export const getAssistance = async (): Promise<string[]> => {
  try {
    // 1. Correctly type the HTTP request generic as the data type (string[])
    console.log("getAssistance service running...");
    const response: ApiResponse<string[]> = await httpService.get<string[]>(
      `/game/AllAssistants`
    );

    // 2. Check for success and ensure data is an array
    if (response.success && Array.isArray(response.data)) {
      return response.data;
    }

    // Handle API failure gracefully for the useQuery hook
    console.error("Failed to fetch assistants:", response.errors);
    // Returning [] ensures the useQuery hook does not throw an error and keeps data safe
    return [];
  } catch (error: any) {
    // Handle network/execution error
    console.error("Error fetching assistants:", error);
    return [];
  }
};
