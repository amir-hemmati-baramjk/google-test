import { useTranslations } from "next-intl";

export default function OfflinePage() {
  const t = useTranslations("Offline");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-main-bg text-white">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="opacity-70 mt-2">{t("message")}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-primary-gradient px-6 py-2 rounded-lg"
      >
        {t("retry")}
      </button>
    </div>
  );
}
