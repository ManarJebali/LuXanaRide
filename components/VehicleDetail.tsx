import Link from "next/link";
import Image from "next/image";
import SpecTable from "@/components/SpecTable";
import InquiryForm from "@/components/InquiryForm";
import CTASection from "@/components/CTASection";
import { getAllVehicles, vehicleContent, vehiclePath } from "@/lib/vehicles";
import type { Vehicle } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function VehicleDetail({
  vehicle,
  locale,
  dict,
}: {
  vehicle: Vehicle;
  locale: Locale;
  dict: Dictionary;
}) {
  const content = vehicleContent(vehicle, locale);
  const isScooter = vehicle.category === "scooter";
  const backHref = `/${locale}/${isScooter ? "scooters" : "tricycles"}`;
  const backLabel = isScooter ? dict.vehicleDetail.backToScooters : dict.vehicleDetail.backToTricycles;
  const categoryLabel = isScooter ? dict.nav.scooters : dict.nav.tricycles;

  const vehicleOptions = getAllVehicles().map((v) => vehicleContent(v, locale).name);

  const headline = [
    { label: dict.vehicleDetail.specs.motorPower, value: vehicle.specs.motorPower },
    { label: dict.vehicleDetail.specs.maxSpeed, value: vehicle.specs.maxSpeed },
    { label: dict.vehicleDetail.specs.rangeLithium, value: vehicle.specs.rangeLithium },
    { label: dict.vehicleDetail.specs.loadCapacity, value: vehicle.specs.loadCapacity },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: content.name,
    description: content.tagline,
    brand: { "@type": "Brand", name: "LuXana Ride" },
    vehicleConfiguration: categoryLabel,
    fuelType: "Electric",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-brand-line/70 bg-brand-ink">
        <div className="mx-auto max-w-content px-6 pb-14 pt-10 lg:px-10">
          <Link href={backHref} className="text-sm text-brand-mist hover:text-brand-white">
            {backLabel}
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                {categoryLabel}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl">
                {content.name}
              </h1>
              <p className="mt-4 text-lg text-brand-mist">{content.tagline}</p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#request"
                  className="inline-flex items-center justify-center border border-brand-red bg-brand-red px-7 py-3.5 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-red-dark hover:border-brand-red-dark"
                >
                  {dict.vehicleDetail.requestQuote}
                </a>
                <a
                  href="#request"
                  className="inline-flex items-center justify-center border border-brand-line px-7 py-3.5 text-sm font-semibold text-brand-white transition-colors hover:border-brand-fog"
                >
                  {dict.vehicleDetail.bookTestRide}
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden border border-brand-line bg-brand-charcoal">
              <Image
                src={vehicle.image}
                alt={vehicle.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-line/70 bg-brand-charcoal">
        <div className="mx-auto max-w-content px-6 py-14 lg:px-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {headline.map((spec) => (
              <div key={spec.label} className="border-s-2 border-brand-line ps-5">
                <p className="text-2xl font-semibold text-brand-white">{spec.value}</p>
                <p className="mt-1 text-sm text-brand-mist">{spec.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
              {dict.vehicleDetail.overviewTitle}
            </h2>
            <div className="mt-5 space-y-4">
              {content.overview.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-brand-mist">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
              {dict.vehicleDetail.featuresTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {content.features.map((feature) => (
                <li key={feature} className="border-b border-brand-line/70 pb-3 text-sm text-brand-mist">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-line/70 bg-brand-charcoal">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
            {dict.vehicleDetail.specsTitle}
          </h2>
          <div className="mt-8 max-w-2xl">
            <SpecTable vehicle={vehicle} locale={locale} dict={dict} />
          </div>
        </div>
      </section>

      <section id="request" className="mx-auto max-w-content scroll-mt-24 px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
              {dict.vehicleDetail.requestTitlePrefix} {content.name}
            </h2>
            <p className="mt-4 leading-relaxed text-brand-mist">{dict.vehicleDetail.requestIntro}</p>
          </div>
          <div className="lg:col-span-2">
            <InquiryForm
              dict={dict}
              vehicleOptions={vehicleOptions}
              defaultModel={content.name}
              defaultRequestType={dict.inquiryForm.requestTypes.quote}
            />
          </div>
        </div>
      </section>

      <CTASection
        heading={dict.vehicleDetail.notSureTitle}
        body={dict.vehicleDetail.notSureBody}
        primaryHref={backHref}
        primaryLabel={isScooter ? dict.vehicleDetail.viewAllScooters : dict.vehicleDetail.viewAllTricycles}
        secondaryHref={`/${locale}/contact`}
        secondaryLabel={dict.nav.contact}
      />
    </>
  );
}
