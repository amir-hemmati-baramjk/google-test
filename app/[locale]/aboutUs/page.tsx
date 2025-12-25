import Image from "next/image";
import React from "react";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("about");
  return (
    <div>
      <BackHeaderForsubPages title={t("title")} />
      <div className="flex flex-col justify-center items-center gap-5 p-5">
        <Image
          alt=""
          className="w-full lg:w-1/3"
          width={1000}
          height={1000}
          src={"/staticImages/about-falta.png"}
        />
        <div className="flex flex-col justify-center items-center gap-5 w-full lg:w-1/2 ">
          <h2 className="text-3xl lg:text-4xl font-[700] text-white text-center">
            {t("about-us-head")}
          </h2>
          <p className="text-white">{t("about-us-item-one-head")}</p>

          <p className="text-white my-2">{t("about-us-item-one-one")}</p>
          <p className="text-white my-2">{t("about-us-item-one-two")}</p>
          <p className="text-white my-2">{t("about-us-item-one-three")}</p>
          <p className="text-white my-2">{t("about-us-item-one-four")}</p>
          <p className="text-white">{t("about-us-item-two-head")}</p>
          <p className="text-white my-2">{t("about-us-item-two-one")}</p>
          <p className="text-white my-2">{t("about-us-item-two-two")}</p>
          <p className="font-bold mt-4 text-white">{t("about-footer")}</p>
        </div>
      </div>
    </div>
  );
}
