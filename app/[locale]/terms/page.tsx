import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.terms.title,
    description: dict.meta.terms.description,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);

  return (
    <LegalPage
      content={dict.legal.terms}
      email={dict.common.email}
      phone={dict.common.phoneDisplay}
    />
  );
}
