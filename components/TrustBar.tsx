const ITEMS = [
  {
    stat: "8 yr / 120k mi",
    label: "Battery & drivetrain warranty on every car",
  },
  {
    stat: "42 states",
    label: "Showroom and certified service network",
  },
  {
    stat: "3rd-party",
    label: "Pre-delivery inspection on every vehicle",
  },
  {
    stat: "Multiple lenders",
    label: "Financing and lease partners available",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-brand-line/70 bg-brand-charcoal">
      <div className="mx-auto max-w-content px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.label} className="border-l border-brand-line pl-5">
              <p className="text-2xl font-semibold text-brand-white">{item.stat}</p>
              <p className="mt-1 text-sm text-brand-mist">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
