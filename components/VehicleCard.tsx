import Link from "next/link";
import Image from "next/image";
import { vehicleContent, vehiclePath } from "@/lib/vehicles";
import type { Vehicle } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function VehicleCard({
  vehicle,
  locale,
  dict,
}: {
  vehicle: Vehicle;
  locale: Locale;
  dict: Dictionary;
}) {
  const content = vehicleContent(vehicle, locale);
  const specLabels = dict.vehicleDetail.specs;

  const headline = [
    { label: specLabels.motorPower, value: vehicle.specs.motorPower },
    { label: specLabels.maxSpeed, value: vehicle.specs.maxSpeed },
    { label: specLabels.rangeLithium, value: vehicle.specs.rangeLithium },
  ];

  return (
    <Link
      href={vehiclePath(vehicle, locale)}
      className="group block border border-brand-line bg-brand-charcoal transition-colors hover:border-brand-fog"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-steel">
        <Image
          src={vehicle.image}
          alt={vehicle.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-brand-white">{content.name}</h3>
        <p className="mt-1 text-sm text-brand-mist">{content.tagline}</p>

        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-brand-line pt-5">
          {headline.map((spec) => (
            <div key={spec.label}>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-brand-mist">
                {spec.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-brand-white">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}
