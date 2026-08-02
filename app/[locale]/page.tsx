import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import WarrantySection from "@/components/WarrantySection";
import VehicleGrid from "@/components/VehicleGrid";
import CTASection from "@/components/CTASection";
import { getVehiclesByCategory } from "@/lib/vehicles";
import { toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);
  const scooters = getVehiclesByCategory("scooter");
  const tricycles = getVehiclesByCategory("tricycle");

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <WhySection dict={dict} />

      <section className="mx-auto max-w-content px-6 py-20 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
          {dict.lineup.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-brand-white">
          {dict.lineup.title}
        </h2>
        <p className="mt-3 max-w-xl text-brand-mist">{dict.lineup.intro}</p>

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-brand-white">{dict.nav.scooters}</h3>
          <div className="mt-5">
            <VehicleGrid vehicles={scooters} locale={locale} dict={dict} />
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-lg font-semibold text-brand-white">{dict.nav.tricycles}</h3>
          <div className="mt-5">
            <VehicleGrid vehicles={tricycles} locale={locale} dict={dict} />
          </div>
        </div>
      </section>

      <WarrantySection dict={dict} />

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
