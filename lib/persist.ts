import { accessTokenLs, refreshTokenLS } from "@/localeStorage/storage";

type ExternalLoginBody =
  | { accessToken?: string; refreshToken?: string; user?: any }
  | null
  | undefined;

export function persistAuthFromResponse(res: any) {
  const data: ExternalLoginBody = res?.data?.data ?? res?.data ?? res;
  if (data?.accessToken) accessTokenLs.set(data.accessToken);
  if (data?.refreshToken) refreshTokenLS.set(data.refreshToken);
  return Boolean(data?.accessToken || data?.refreshToken);
}
