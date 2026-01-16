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

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipAuth?: boolean;
}

interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}

const DEFAULT_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://api.befalta.com/api/",
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
  timeoutErrorMessage: "Request timeout",
};

class HttpService {
  private static instance: HttpService;
  private isRefreshing = false;
  private refreshQueue: QueuedRequest[] = [];

  private client = axios.create(DEFAULT_CONFIG);

  private constructor() {
    this.setupInterceptors();
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleRequestError.bind(this),
    );

    this.client.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleResponseError.bind(this),
    );
  }

  private handleRequest(config: CustomAxiosRequestConfig) {
    if (config._skipAuth) return config;

    const token = accessTokenLs.get();
    if (token && config.headers) {
      const headers = config.headers as AxiosHeaders;
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (config.method?.toLowerCase() === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    if (config.data instanceof FormData) {
      if (config.headers instanceof axios.AxiosHeaders) {
        config.headers.set("Content-Type", "multipart/form-data");
      } else {
        config.headers = new axios.AxiosHeaders({
          "Content-Type": "multipart/form-data",
        });
      }
    }

    return config;
  }

  private handleRequestError(error: AxiosError) {
    return Promise.reject(error);
  }

  private handleResponse(response: AxiosResponse<BaseApiResponse>) {
    return response;
  }

  private async handleResponseError(error: AxiosError) {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      return this.handleUnauthorized(originalRequest);
    }

    return Promise.reject(error);
  }

  private async handleUnauthorized(originalRequest: CustomAxiosRequestConfig) {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.refreshQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    originalRequest._retry = true;
    this.isRefreshing = true;

    try {
      const newTokens = await this.refreshToken();
      await this.processQueuedRequests(newTokens.accessToken);

      originalRequest.headers = originalRequest.headers || {};
      (originalRequest.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${newTokens.accessToken}`,
      );

      return this.client(originalRequest);
    } catch (err) {
      await this.processQueuedRequestsWithError(err as Error);
      this.logout();
      return Promise.reject(err);
    } finally {
      this.isRefreshing = false;
    }
  }

  private async refreshToken(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const rToken = refreshTokenLS.get();

    if (!rToken) throw new Error("No refresh token found");

    const response = await this.client.post<
      BaseApiResponse<{ accessToken: string; refreshToken: string }>
    >(process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL!, { refreshToken: rToken }, {
      _skipAuth: true,
    } as CustomAxiosRequestConfig);
    const data = response.data.data;
    accessTokenLs.set(data.accessToken);
    refreshTokenLS.set(data.refreshToken);

    return data;
  }

  private async processQueuedRequests(accessToken: string) {
    await Promise.all(
      this.refreshQueue.map(({ resolve, reject, config }) => {
        config.headers = config.headers || {};
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${accessToken}`,
        );
        this.client(config).then(resolve).catch(reject);
      }),
    );

    this.refreshQueue = [];
  }

  private async processQueuedRequestsWithError(err: Error) {
    this.refreshQueue.forEach(({ reject }) => reject(err));
    this.refreshQueue = [];
  }

  private logout() {
    refreshTokenLS.remove();
    accessTokenLs.remove();
    userDataSS.remove();
    isLoginLS.remove();

    if (typeof window !== "undefined") {
      window.location.href = `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/login`;
    }
  }

  public async get<T>(url: string, config?: InternalAxiosRequestConfig) {
    return this.request<T>("GET", url, undefined, config);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ) {
    return this.request<T>("POST", url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ) {
    return this.request<T>("PUT", url, data, config);
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ) {
    return this.request<T>("PATCH", url, data, config);
  }

  public async delete<T>(url: string, config?: InternalAxiosRequestConfig) {
    return this.request<T>("DELETE", url, undefined, config);
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const res = await this.client({ method, url, data, ...config });
      return this.mapSuccess<T>(res);
    } catch (err) {
      return this.mapError<T>(err);
    }
  }

  private mapSuccess<T>(
    response: AxiosResponse<BaseApiResponse<T>>,
  ): ApiResponse<T> {
    const data = response.data;

    return {
      success: data.statusCode >= 200 && data.statusCode < 300,
      data: data.data,
      errors: data.errors?.length ? data.errors : null,
      statusCode: data.statusCode,
      message: data.message,
    };
  }

  private mapError<T>(error: any): ApiResponse<T> {
    const axiosErr = error as AxiosError<BaseApiResponse>;

    // Network failure
    if (axiosErr.request && !axiosErr.response) {
      return {
        success: false,
        data: undefined,
        errors: "Network connection lost",
        message: "NETWORK_ERROR",
        statusCode: 0,
      };
    }

    // Timeout
    if (axiosErr.code === "ECONNABORTED") {
      return {
        success: false,
        data: undefined,
        errors: "Request timeout",
        message: "TIMEOUT",
        statusCode: 0,
      };
    }

    // Backend error response
    if (axiosErr.response?.data) {
      const eData = axiosErr.response.data;
      return {
        success: false,
        data: undefined,
        errors: eData.errors?.length ? eData.errors : eData.message,
        statusCode: eData.statusCode,
        message: eData.message,
      };
    }

    // Unknown
    return {
      success: false,
      data: undefined,
      errors: axiosErr.message,
      message: "UNKNOWN_ERROR",
      statusCode: axiosErr.response?.status,
    };
  }

  public async publicGet<T>(url: string, config?: InternalAxiosRequestConfig) {
    return this.get<T>(url, {
      ...config,
      _skipAuth: true,
    } as CustomAxiosRequestConfig);
  }

  public async publicPost<T>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ) {
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
