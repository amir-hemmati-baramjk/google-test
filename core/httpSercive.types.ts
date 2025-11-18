// Base API response structure matching your backend
export interface BaseApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
  errors: string[];
}

// Your existing ApiResponse interface for frontend consistency
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  errors?: string | string[] | null;
  statusCode?: number;
  message?: string;
}
