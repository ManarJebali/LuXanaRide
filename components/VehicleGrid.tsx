import VehicleCard from "@/components/VehicleCard";
import type { Vehicle } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function VehicleGrid({
  vehicles,
  locale,
  dict,
}: {
  vehicles: Vehicle[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.slug} vehicle={vehicle} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
