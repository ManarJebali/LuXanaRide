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
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);

  return (
    <LegalPage
      content={dict.legal.privacy}
      email={dict.common.email}
      phone={dict.common.phoneDisplay}
    />
  );
}
