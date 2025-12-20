import { accessTokenLs, refreshTokenLS } from "@/localeStorage/storage";
import { httpService } from "../httpService";
import { ApiResponse } from "../httpSercive.types";
import {
  SocialLoginPayload,
  SocialLoginResponse,
  WnPayload,
} from "@/type/api/auth/auth.types";

export const AUTH_ORIGIN =
  process.env.NEXT_PUBLIC_AUTH_ORIGIN ?? "https://auth.befalta.com";
export const SOCIAL_LOGIN_ENDPOINT = "/auth/external/login";

export const postSocialLogin = async (
  payload: SocialLoginPayload,
  endpoint: string = "/auth/login"
): Promise<ApiResponse<SocialLoginResponse>> => {
  try {
    const response = await httpService.post<SocialLoginResponse>(
      endpoint,
      payload
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.response?.data?.message || "Social login failed",
      data: undefined,
    };
  }
};

export const postSocialRegister = async (
  payload: SocialLoginPayload,
  endpoint: string = "/auth/register"
): Promise<ApiResponse<SocialLoginResponse>> => {
  try {
    const response = await httpService.post<SocialLoginResponse>(
      endpoint,
      payload
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.response?.data?.message || "Social registration failed",
      data: undefined,
    };
  }
};

export const persistFromResponse = (
  res: ApiResponse<SocialLoginResponse>
): boolean => {
  const data = res.data;

  if (data) {
    const at = data.accessToken;
    const rt = data.refreshToken;

    if (at) accessTokenLs.set(at);
    if (rt) refreshTokenLS.set(rt);

    return Boolean(at || rt);
  }

  return false;
};

export const readFromWindowName = (): WnPayload | null => {
  try {
    if (typeof window.name === "string" && window.name.startsWith("SOCIAL|")) {
      const json = atob(window.name.split("|", 2)[1]);
      return JSON.parse(json);
    }
  } catch {}
  return null;
};

export const readFromHash = (): WnPayload | null => {
  try {
    const hash = window.location.hash?.slice(1) || "";
    if (!hash) return null;
    const m = hash.match(/(?:^|&)wn=([^&]+)/);
    if (!m) return null;
    const json = atob(decodeURIComponent(m[1]));
    return JSON.parse(json);
  } catch {}
  return null;
};

export const callExternalLogin = async (
  payload: SocialLoginPayload
): Promise<boolean> => {
  const res = await postSocialLogin(payload, "/auth/external/login");

  if (res.success && res.data) {
    const saved = persistFromResponse(res);
    if (!saved && !accessTokenLs.get() && !refreshTokenLS.get()) {
      try {
        const me = await httpService.get("/account");
        if (me.success) return true;
      } catch {}
      throw new Error("session_not_set");
    }
    return true;
  }
  throw new Error((res.errors as string) || `Login failed`);
};

export const cleanQueryParams = (): void => {
  const url = new URL(window.location.href);
  url.searchParams.delete("sid");
  url.searchParams.delete("social");
  url.searchParams.delete("provider");

  if (window.location.hash) {
    window.history.replaceState(null, "", url.toString());
  } else {
    window.history.replaceState(null, "", url.toString());
  }
};
