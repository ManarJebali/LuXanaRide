import type { Metadata } from "next";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import WarrantySection from "@/components/WarrantySection";
import CTASection from "@/components/CTASection";
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
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);

  return (
    <>
      <section className="border-b border-brand-line/70 bg-brand-ink">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
              {dict.about.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl">
              {dict.about.title}
            </h1>
            <p className="mt-6 leading-relaxed text-brand-mist">{dict.about.intro}</p>
          </div>
          <MediaPlaceholder
            label="LuXana Ride"
            aspect="aspect-[4/3]"
            className="w-full"
          />
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
              {dict.about.approachTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-brand-mist">{dict.about.approach}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
              {dict.about.warrantyTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-brand-mist">{dict.about.warrantyBody}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-line/70 bg-brand-charcoal">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
            {dict.about.categoriesTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {dict.about.categories.map((category) => (
              <div key={category.title} className="border border-brand-line px-6 py-6">
                <h3 className="font-semibold text-brand-white">{category.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-mist">{category.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WarrantySection dict={dict} />

      <CTASection
        heading={dict.ctaBand.title}
        body={dict.ctaBand.subtitle}
        primaryHref={`/${locale}/contact`}
        primaryLabel={dict.ctaBand.primaryLabel}
        secondaryHref={`/${locale}/scooters`}
        secondaryLabel={dict.nav.scooters}
      />
    </>
  );
}
