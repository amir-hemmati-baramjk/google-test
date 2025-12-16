"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { BackHeaderForsubPages } from "@/app/[locale]/_components/backHeader/backHeaderForsubPages";

const Page = () => {
  const t = useTranslations("payment-result");
  const router = useRouter();
  return (
    <div>
      <BackHeaderForsubPages
        onBack={() => router.replace("/")}
        title="Order Success"
      />
      <div className="mt-10 flex justify-center items-center px-5">
        <div className=" rounded-[10px] t text-center w-full">
          <div className="flex flex-col items-center pt-[46px] pb-5 px-[30px] text-white text-center">
            <Image
              src={"/staticImages/order-success.png"}
              alt={""}
              width={57}
              height={78}
            />

            <p className="mt-2 text-xl lg:text-3xl font-bold">
              {t("thank-you-title")}
            </p>
            <p className="mt-[18px] text-lg lg:text-xl">{t("have-a-fun")}</p>
            <p className=" text-lg lg:text-xl mt-5">{t("thank-you-dec")}</p>
          </div>
          <button
            onClick={() => router?.push("/")}
            className="bg-primary text-white font-medium mt-5 py-3 w-full rounded-[5px]"
          >
            {t("back-to-home")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
