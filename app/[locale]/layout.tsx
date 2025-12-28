import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import "../toast-custom.css";
import QueryProvider from "@/stores/QueryProvider";
import LocaleLayoutWrapper from "./LocaleLayoutWrapper";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <QueryProvider>
      <LocaleLayoutWrapper params={params}>{children}</LocaleLayoutWrapper>
    </QueryProvider>
  );
}
