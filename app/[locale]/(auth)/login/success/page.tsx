"use client";
import React, { useEffect } from "react";
import { useLocale } from "next-intl";
export default function Success() {
  const locale = useLocale();
  useEffect(() => {
    window.location.href = `/${locale}/`;
  }, []);
  return <></>;
}
