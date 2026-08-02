import Link from "next/link";

interface CTASectionProps {
  heading: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}

export default function CTASection({
  heading,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="bg-brand-ink">
      <div className="mx-auto max-w-content px-6 py-20 lg:px-10">
        <div className="border border-brand-line bg-brand-charcoal px-8 py-14 text-center sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-mist">
            {body}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center border border-brand-red bg-brand-red px-7 py-3.5 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-red-dark hover:border-brand-red-dark"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center border border-brand-line px-7 py-3.5 text-sm font-semibold text-brand-white transition-colors hover:border-brand-fog"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
