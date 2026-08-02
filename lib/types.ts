import type { Locale } from "@/lib/i18n/config";

export type VehicleCategory = "scooter" | "tricycle";

export interface VehicleSpecs {
  motorPower: string;
  maxSpeed: string;
  rangeLithium: string;
  rangePlomb: string;
  chargeTime: string;
  controller: string;
  tires: string;
  loadCapacity: string;
}

export interface VehicleLocaleContent {
  name: string;
  tagline: string;
  brakes: string;
  overview: string[];
  features: string[];
}

export interface Vehicle {
  slug: string;
  category: VehicleCategory;
  image: string;
  imageAlt: string;
  specs: VehicleSpecs;
  content: Record<Locale, VehicleLocaleContent>;
}
