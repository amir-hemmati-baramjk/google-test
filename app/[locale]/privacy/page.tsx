import { useTranslations } from "next-intl";
import React from "react";
import { BackHeaderForsubPages } from "../_components/backHeader/backHeaderForsubPages";

export default function page() {
  const t = useTranslations("privacy");
  const renderList = (sectionNumber: string) =>
    t.raw(`sections.${sectionNumber}.list`).map((item: string, idx: number) => (
      <li key={idx} className="mb-1  list-inside lg:text-lg">
        {item}
      </li>
    ));
  return (
    <div>
      <BackHeaderForsubPages title="Privacy Policy" />
      <div className="w-full flex flex-col items-center justify-center pt-[37px] text-white px-6 pb-[90px] max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <section className="mt-6">
          <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
            {t("sections.1.title")}
          </h2>
          <p>{t("sections.1.body")}</p>
        </section>

        <section className="mt-6 w-full">
          <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
            {t("sections.2.title")}
          </h2>
          <ul>{renderList("2")}</ul>
        </section>
        <section className="mt-6 w-full">
          <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
            {t("sections.3.title")}
          </h2>
          <ul>{renderList("3")}</ul>
        </section>
        <section className="mt-6 w-full">
          <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
            {t("sections.4.title")}
          </h2>
          <ul>{renderList("4")}</ul>
        </section>
        <section className="mt-6 w-full">
          <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
            {t("sections.5.title")}
          </h2>
          <ul>{renderList("5")}</ul>
        </section>
        <section className="mt-6 w-full">
          <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
            {t("sections.6.title")}
          </h2>
          <p>{t("sections.6.body")}</p>
        </section>
        <section className="mt-6 w-full">
          <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
            {t("sections.7.title")}
          </h2>
          <p>{t("sections.7.body")}</p>
        </section>
      </div>
    </div>
  );
}
