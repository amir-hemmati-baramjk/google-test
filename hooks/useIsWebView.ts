"use client";

import { useState, useEffect } from "react";

export const useIsWebView = () => {
  const [isWebView, setIsWebView] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent || window.navigator.vendor;

    const checks = {
      android:
        /Version\/.*Chrome\/.*Mobile/i.test(userAgent) && /wv/i.test(userAgent),

      ios:
        /AppleWebKit\/.*Mobile/i.test(userAgent) && !/Safari/i.test(userAgent),

      social: /FBAN|FBAV|Instagram|Twitter|Threads/i.test(userAgent),
    };

    if (checks.android || checks.ios || checks.social) {
      setIsWebView(true);
    }
  }, []);

  return isWebView;
};
