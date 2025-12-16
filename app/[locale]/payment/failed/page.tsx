"use client";
import React from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "../../_components/button/button";
import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";

const Page = () => {
  const t = useTranslations("payment-result");
  const router = useRouter();
  return (
    <div>
      <BackHeaderForsubPages
        onBack={() => router.replace("/")}
        title="Order Failed"
      />
      <div className="h-full flex justify-center items-center px-5">
        <div className=" p-5 rounded-[10px]  text-center w-full max-w-[400px] mt-10">
          <div className="flex flex-col items-center pt-[46px] pb-5 px-[30px] text-[#D53430] text-center">
            <Image
              src={"/staticImages/order-failed.png"}
              alt={""}
              width={123}
              height={104}
            />
            <p className="mt-2 text-xl lg:text-3xl font-bold">
              {t("order-failed-title")}
            </p>
            <p className="mt-[18px] text-lg lg:text-xl">
              {t("order-failed-message1")}
            </p>
            <p className=" text-lg lg:text-xl">{t("order-failed-message2")}</p>
          </div>
          <Button
            variant="primary"
            size="large"
            shape="full"
            className="mt-10"
            onClick={() => router?.push("/")}
          >
            {t("back-to-home")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
