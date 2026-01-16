import "../globals.css";
import "../toast-custom.css";
import QueryProvider from "@/stores/QueryProvider";
import LocaleLayoutWrapper from "./LocaleLayoutWrapper";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import "../toast-custom.css";
import { Cairo, Noto_Kufi_Arabic } from "next/font/google";
import { Metadata } from "next";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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

      <body>
        <QueryProvider>
          <LocaleLayoutWrapper params={params}>{children}</LocaleLayoutWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
