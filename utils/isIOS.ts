export const isIOS = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined")
    return false;

  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;
  const isAppleMobile = /iPad|iPhone|iPod/.test(userAgent);
  const hasNoMSStream = !(window as any).MSStream;

  return isAppleMobile && hasNoMSStream;
};
