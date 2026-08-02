import type { Metadata } from "next";
import VehicleGrid from "@/components/VehicleGrid";
import CTASection from "@/components/CTASection";
import { getVehiclesByCategory } from "@/lib/vehicles";
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
    title: dict.meta.tricycles.title,
    description: dict.meta.tricycles.description,
  };
}

export default async function TricyclesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);
  const vehicles = getVehiclesByCategory("tricycle");

  return (
    <>
      <section className="border-b border-brand-line/70 bg-brand-ink">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            {dict.nav.tricycles}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl">
            {dict.meta.tricycles.title}
          </h1>
          <p className="mt-5 max-w-xl text-brand-mist">{dict.meta.tricycles.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-14 lg:px-10">
        <VehicleGrid vehicles={vehicles} locale={locale} dict={dict} />
      </section>

      <CTASection
        heading={dict.ctaBand.title}
        body={dict.ctaBand.subtitle}
        primaryHref={`/${locale}/contact`}
        primaryLabel={dict.ctaBand.primaryLabel}
        secondaryHref={`/${locale}/contact`}
        secondaryLabel={dict.ctaBand.secondaryLabel}
      />
    </>
  );
}
