import "../globals.css";
import QueryProvider from "@/stores/QueryProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import NextTopLoader from "nextjs-toploader";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../toast-custom.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayoutWrapper({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    // notFound();
  }

  const messages = await getMessages();

  return (
    <>
      <NextTopLoader showSpinner={false} />

      <QueryProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayoutWrapper locale={locale}>
            <ToastContainer
              toastClassName="custom-toast"
              position="top-center"
              theme="colored"
            />

            {children}
          </ClientLayoutWrapper>
        </NextIntlClientProvider>
      </QueryProvider>
    </>
  );
}
