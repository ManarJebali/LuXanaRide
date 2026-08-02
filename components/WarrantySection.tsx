import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function WarrantySection({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-content px-6 py-16 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
        {dict.warranty.eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-brand-white">
        {dict.warranty.title}
      </h2>
      <p className="mt-3 max-w-xl text-brand-mist">{dict.warranty.intro}</p>

      <div className="mt-8 border border-brand-line">
        <table className="w-full border-collapse">
          <caption className="sr-only">{dict.warranty.title}</caption>
          <tbody>
            {dict.warranty.items.map((item, i) => (
              <tr key={item.label} className={i % 2 === 0 ? "bg-brand-charcoal" : ""}>
                <th scope="row" className="px-5 py-3.5 text-start text-sm font-normal text-brand-mist">
                  {item.label}
                </th>
                <td className="px-5 py-3.5 text-end text-sm font-semibold text-brand-white">
                  {item.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
