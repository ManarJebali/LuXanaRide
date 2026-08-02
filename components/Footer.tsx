import Link from "next/link";
import Logo from "@/components/Logo";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="border-t border-brand-line/70 bg-brand-ink">
      <div className="mx-auto max-w-content px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo locale={locale} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-mist">
              {dict.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-fog">
              {dict.footer.exploreTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-mist">
              <li><Link href={`/${locale}/scooters`} className="hover:text-brand-white">{dict.nav.scooters}</Link></li>
              <li><Link href={`/${locale}/tricycles`} className="hover:text-brand-white">{dict.nav.tricycles}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-brand-white">{dict.nav.about}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-fog">
              {dict.footer.ownershipTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-mist">
              <li><Link href={`/${locale}/contact`} className="hover:text-brand-white">{dict.ctaBand.primaryLabel}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-brand-white">{dict.vehicleDetail.bookTestRide}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-brand-white">{dict.about.warrantyTitle}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-fog">
              {dict.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-mist">
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
              <li>{dict.footer.hours}</li>
              <li>{dict.common.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-brand-line/70 pt-8 text-xs text-brand-mist sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} LuXana Ride. {dict.footer.rights}</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-brand-white">
              {dict.footer.privacyPolicy}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-brand-white">
              {dict.footer.termsOfUse}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
