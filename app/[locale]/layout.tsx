import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Noto_Kufi_Arabic } from "next/font/google";
import "../globals.css";
import { locales, isRtl, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const latinFont = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const arabicFont = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

const siteUrl = "https://www.luxanaride.com";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.home.title,
      template: `%s — ${dict.meta.titleSuffix}`,
    },
    description: dict.meta.home.description,
    alternates: {
      languages: { fr: "/fr", en: "/en", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      siteName: "LuXana Ride",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `${siteUrl}/${locale}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);
  const rtl = isRtl(locale);

  return (
    <html lang={locale} dir={rtl ? "rtl" : "ltr"} className={`${latinFont.variable} ${arabicFont.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppButton dict={dict} />
      </body>
    </html>
  );
}
