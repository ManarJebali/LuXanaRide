import type { Vehicle } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { vehicleContent } from "@/lib/vehicles";

export default function SpecTable({
  vehicle,
  locale,
  dict,
}: {
  vehicle: Vehicle;
  locale: Locale;
  dict: Dictionary;
}) {
  const content = vehicleContent(vehicle, locale);
  const labels = dict.vehicleDetail.specs;

  const rows = [
    { label: labels.motorPower, value: vehicle.specs.motorPower },
    { label: labels.maxSpeed, value: vehicle.specs.maxSpeed },
    { label: labels.rangeLithium, value: vehicle.specs.rangeLithium },
    { label: labels.rangePlomb, value: vehicle.specs.rangePlomb },
    { label: labels.chargeTime, value: vehicle.specs.chargeTime },
    { label: labels.controller, value: vehicle.specs.controller },
    { label: labels.brakes, value: content.brakes },
    { label: labels.tires, value: vehicle.specs.tires },
    { label: labels.loadCapacity, value: vehicle.specs.loadCapacity },
  ];

  return (
    <div className="border border-brand-line">
      <table className="w-full border-collapse">
        <caption className="sr-only">{dict.vehicleDetail.specsTitle}</caption>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-brand-charcoal" : ""}>
              <th scope="row" className="px-5 py-3.5 text-start text-sm font-normal text-brand-mist">
                {row.label}
              </th>
              <td className="px-5 py-3.5 text-end text-sm font-semibold text-brand-white">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
