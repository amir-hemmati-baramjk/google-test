import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import QueryProvider from "@/stores/QueryProvider";
import LocaleLayoutWrapper from "./LocaleLayoutWrapper";

const cairo = Cairo({
  display: "swap",
  variable: "--font-cario",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FALTA GAME - لعبة فلته",
  description:
    'فريق كويتي يؤمن إن الترفيه مو بس "فلّه ووناسه"، لكن وراه أثر وفايدة… ويمكن حتى دخل ودخل قوي بعد. من خلال تجربتنا الطويلة بعالم الترفيه',
  icons: {
    icon: "/icons/favicon.ico", // Favicon
    shortcut: "/icons/icon-96x96.png", // Browser shortcut
    apple: "/icons/apple-touch-icon.png", // iOS icon
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <QueryProvider>
      <LocaleLayoutWrapper params={params} fontClass={cairo.variable}>
        {children}
      </LocaleLayoutWrapper>
    </QueryProvider>
  );
}
