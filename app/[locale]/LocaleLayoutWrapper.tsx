("");
import { getMessages, setRequestLocale } from "next-intl/server";
// import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../toast-custom.css";
// import NotificationInitializer from "./_components/notification/NotificationInitializer";
import Script from "next/script";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayoutWrapper({
  children,
  params,
  fontClass,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  fontClass: string;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  setRequestLocale(locale);
  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      className={fontClass}
    >
      <head>
        {/* Google tag (gtag.js) */}
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
      <body suppressHydrationWarning className="antialiased">
        {/* <NextTopLoader showSpinner={false} /> */}
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName="custom-toast"
        /> */}

        {/* <NotificationInitializer /> */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
