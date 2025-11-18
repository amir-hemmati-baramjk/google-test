import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

import {
  accessTokenLs,
  isLoginLS,
  refreshTokenLS,
  userDataSS,
} from "@/localeStorage/storage";
import { BaseApiResponse, ApiResponse } from "./httpSercive.types";

// Custom type definitions
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipAuth?: boolean;
}

interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}

// Default configuration
const DEFAULT_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
  timeoutErrorMessage: "Request timeout",
};

class HttpService {
  private static instance: HttpService;
  private isRefreshing = false;
  private refreshQueue: QueuedRequest[] = [];

  private constructor() {
    this.setupInterceptors();
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private client = axios.create(DEFAULT_CONFIG);

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleRequestError.bind(this)
    );

    this.client.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleResponseError.bind(this)
    );
  }

  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    if ((config as CustomAxiosRequestConfig)._skipAuth) {
      return config;
    }

    const accessToken = accessTokenLs.get();
    if (accessToken && config.headers) {
      const headers = config.headers as AxiosHeaders;
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    if (config.method?.toLowerCase() === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  }

  private handleRequestError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  // Transform successful responses to match your frontend interface
  private handleResponse(
    response: AxiosResponse<BaseApiResponse>
  ): AxiosResponse {
    // You can transform the response here if needed
    return response;
  }

  private async handleResponseError(error: AxiosError): Promise<AxiosResponse> {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Handle 401 errors (Unauthorized)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      return this.handleUnauthorizedError(originalRequest);
    }

    return Promise.reject(error);
  }

  private async handleUnauthorizedError(
    originalRequest: CustomAxiosRequestConfig
  ): Promise<AxiosResponse> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.refreshQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    this.isRefreshing = true;
    originalRequest._retry = true;

    try {
      const newTokens = await this.refreshToken();
      await this.processQueuedRequests(newTokens.accessToken);

      // Retry original request with new token
      originalRequest.headers = originalRequest.headers || {};
      (originalRequest.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${newTokens.accessToken}`
      );

      return this.client(originalRequest);
    } catch (refreshError) {
      await this.processQueuedRequestsWithError(refreshError as Error);
      this.handleLogout();
      return Promise.reject(refreshError);
    } finally {
      this.isRefreshing = false;
    }
  }

  private async refreshToken(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const refreshToken = refreshTokenLS.get();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.client.post<
      BaseApiResponse<{
        accessToken: string;
        refreshToken: string;
      }>
    >(process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL!, { refreshToken }, {
      _skipAuth: true,
    } as CustomAxiosRequestConfig);

    // Extract data from your API response structure
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    accessTokenLs.set(accessToken);
    refreshTokenLS.set(newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }

  private async processQueuedRequests(accessToken: string): Promise<void> {
    await Promise.all(
      this.refreshQueue.map(({ config, resolve, reject }) => {
        config.headers = config.headers || {};
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${accessToken}`
        );

        this.client(config).then(resolve).catch(reject);
      })
    );

    this.refreshQueue = [];
  }

  private async processQueuedRequestsWithError(error: Error): Promise<void> {
    this.refreshQueue.forEach(({ reject }) => reject(error));
    this.refreshQueue = [];
  }

  private handleLogout(): void {
    refreshTokenLS.remove();
    accessTokenLs.remove();
    userDataSS.remove();
    isLoginLS.remove();

    if (typeof window !== "undefined") {
      window.location.href = `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/login`;
    }
  }

  // Public methods that transform backend response to frontend format
  public async get<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, config);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, data, config);
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", url, undefined, config);
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<BaseApiResponse<T>> = await this.client({
        method,
        url,
        data,
        ...config,
      });

      // Transform backend response to frontend format
      return this.transformResponse<T>(response);
    } catch (error: any) {
      return this.transformError<T>(error);
    }
  }

  // Transform successful backend response to frontend format
  private transformResponse<T>(
    response: AxiosResponse<BaseApiResponse<T>>
  ): ApiResponse<T> {
    const backendResponse = response.data;

    return {
      success:
        backendResponse.statusCode >= 200 && backendResponse.statusCode < 300,
      data: backendResponse.data,
      errors: backendResponse.errors.length > 0 ? backendResponse.errors : null,
      statusCode: backendResponse.statusCode,
      message: backendResponse.message,
    };
  }

  // Transform error response to frontend format
  private transformError<T>(error: any): ApiResponse<T> {
    const axiosError = error as AxiosError<BaseApiResponse>;

    // If we have a response from backend with your structure
    if (axiosError.response?.data) {
      const backendError = axiosError.response.data;

      return {
        success: false,
        data: undefined,
        errors:
          backendError.errors.length > 0
            ? backendError.errors
            : backendError.message,
        statusCode: backendError.statusCode,
        message: backendError.message,
      };
    }

    // Network errors or other Axios errors
    return {
      success: false,
      errors: axiosError.message || "An error occurred",
      data: undefined,
      statusCode: axiosError.response?.status,
    };
  }

  // Methods for public endpoints
  public async publicGet<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.get<T>(url, {
      ...config,
      _skipAuth: true,
    } as CustomAxiosRequestConfig);
  }

  public async publicPost<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.post<T>(url, data, {
      ...config,
      _skipAuth: true,
    } as CustomAxiosRequestConfig);
  }
}

export const httpService = HttpService.getInstance();
export const {
  get,
  post,
  put,
  patch,
  delete: deleteMethod,
  publicGet,
  publicPost,
} = httpService;
