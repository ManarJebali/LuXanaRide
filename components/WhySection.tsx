import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function WhySection({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-brand-line/70 bg-brand-charcoal">
      <div className="mx-auto max-w-content px-6 py-16 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
          {dict.why.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-brand-white">
          {dict.why.title}
        </h2>
        <p className="mt-3 max-w-xl text-brand-mist">{dict.why.intro}</p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {dict.why.points.map((point) => (
            <div key={point.title} className="border-s-2 border-brand-red/60 ps-6">
              <h3 className="font-semibold text-brand-white">{point.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-brand-mist">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
