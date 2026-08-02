import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";
import GoogleMap from "@/components/GoogleMap";
import { getAllVehicles, vehicleContent } from "@/lib/vehicles";
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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const dict = await getDictionary(locale);
  const vehicleOptions = getAllVehicles().map((v) => vehicleContent(v, locale).name);

  return (
    <>
      <section className="border-b border-brand-line/70 bg-brand-ink">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            {dict.contactPage.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl">
            {dict.contactPage.title}
          </h1>
          <p className="mt-5 max-w-xl text-brand-mist">{dict.contactPage.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
              {dict.contactPage.formTitle}
            </h2>
            <div className="mt-6">
              <InquiryForm dict={dict} vehicleOptions={vehicleOptions} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
              {dict.contactPage.directTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-brand-mist">
              <li>
                <a href={`tel:${dict.common.phoneHref}`} className="hover:text-brand-white" dir="ltr">
                  {dict.common.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${dict.common.email}`} className="hover:text-brand-white">
                  {dict.common.email}
                </a>
              </li>
              <li>{dict.common.hours}</li>
              <li className="border-t border-brand-line/70 pt-3">
                <span className="block text-xs uppercase tracking-[0.08em] text-brand-fog">
                  {dict.contactPage.ceoLabel}
                </span>
                <a href={`mailto:${dict.common.ceoEmail}`} className="hover:text-brand-white">
                  {dict.common.ceoEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line/70 bg-brand-charcoal">
        <div className="mx-auto max-w-content px-6 py-16 lg:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-white">
            {dict.contactPage.locationsTitle}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
            <GoogleMap address={dict.common.address} title={dict.contactPage.locationsTitle} />
            <div>
              <span className="block text-xs uppercase tracking-[0.08em] text-brand-fog">
                {dict.contactPage.addressLabel}
              </span>
              <p className="mt-1 text-brand-mist">{dict.common.address}</p>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(dict.common.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-brand-red hover:text-brand-red-dark"
              >
                {dict.contactPage.getDirections}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
