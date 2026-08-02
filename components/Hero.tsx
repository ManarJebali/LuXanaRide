import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-brand-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-0 h-[560px] w-[560px] rounded-full bg-brand-red/20 blur-[140px]"
      />
      <div className="relative mx-auto grid max-w-content grid-cols-1 gap-12 px-6 pb-16 pt-16 lg:grid-cols-2 lg:items-center lg:px-10 lg:pb-24 lg:pt-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-mist sm:text-lg">
            {dict.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/${locale}/scooters`}
              className="inline-flex items-center justify-center border border-brand-red bg-brand-red px-7 py-3.5 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-red-dark hover:border-brand-red-dark"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/tricycles`}
              className="inline-flex items-center justify-center border border-brand-line px-7 py-3.5 text-sm font-semibold text-brand-white transition-colors hover:border-brand-fog"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden border border-brand-line bg-brand-charcoal">
          <Image
            src="/images/s1.jpg"
            alt={dict.hero.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
