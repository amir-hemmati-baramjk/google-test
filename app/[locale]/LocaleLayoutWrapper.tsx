import type { Metadata } from "next";
import { Cairo, Noto_Kufi_Arabic } from "next/font/google";
import "../globals.css";
import QueryProvider from "@/stores/QueryProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../toast-custom.css";

const cairo = Cairo({
  display: "swap",
  variable: "--font-cario",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
const notoKufi = Noto_Kufi_Arabic({
  display: "swap",
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "FALTA GAME - لعبة فلته",
  description:
    'فريق كويتي يؤمن إن الترفيه مو بس "فلّه ووناسه"، لكن وراه أثر وفايدة… ويمكن حتى دخل ودخل قوي بعد. من خلال تجربتنا الطويلة بعالم الترفيه',
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/icon-96x96.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

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
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      className={`${cairo.variable} ${notoKufi.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#2f0075" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-56YLDC1BFD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-56YLDC1BFD');
          `}
        </Script>
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sx6c39vdov");`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased bg-main-bg min-h-screen  !select-none flex flex-col justify-between "
      >
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
      </body>
    </html>
  );
}
