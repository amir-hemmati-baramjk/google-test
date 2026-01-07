"use client";
import React, { useEffect } from "react";
import { backHeaderType } from "../../../../type/components/backHeader.types";

import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";

export const BackHeaderForsubPages: React.FC<backHeaderType> = ({
  title,
  onBack,
  description,
  to,
}: backHeaderType) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/profile");
  }, [router]);

  function handleBackClick() {
    if (to) {
      router.replace(to);
    } else {
      if (onBack) {
        onBack();
      } else {
        router.back();
      }
    }
  }

  return (
    <div
      style={{ direction: "ltr" }}
      className="select-none bg-primary-bg-gradient p-2  lg:p-5 lg:mt-5 w-full pt-12 lg:pt-5 z-50 "
    >
      <div className="flex items-center justify-between w-full gap-4">
        <button
          className="text-primary flex justify-center items-center bg-white rounded-[6px]"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon size={36} />
        </button>
        <p className="text-white text-lg lg:text-3xl xl:text-4xl font-[700] truncate max-w-[90%]">
          {title}
        </p>
        <div className="w-8"></div>
      </div>
      {description && (
        <p className="mt-5 text-center text-[14px] text-white">{description}</p>
      )}
    </div>
  );
};
