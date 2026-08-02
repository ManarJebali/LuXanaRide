import scooters from "@/lib/data/scooters.json";
import tricycles from "@/lib/data/tricycles.json";
import type { Vehicle, VehicleCategory } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";

const allVehicles = [...(scooters as Vehicle[]), ...(tricycles as Vehicle[])];

export function getVehiclesByCategory(category: VehicleCategory): Vehicle[] {
  return allVehicles.filter((v) => v.category === category);
}

export function getAllVehicles(): Vehicle[] {
  return allVehicles;
}

export function getVehicle(category: VehicleCategory, slug: string): Vehicle | undefined {
  return allVehicles.find((v) => v.category === category && v.slug === slug);
}

export function vehicleContent(vehicle: Vehicle, locale: Locale) {
  return vehicle.content[locale];
}

export function vehiclePath(vehicle: Vehicle, locale: Locale): string {
  const segment = vehicle.category === "scooter" ? "scooters" : "tricycles";
  return `/${locale}/${segment}/${vehicle.slug}`;
}
