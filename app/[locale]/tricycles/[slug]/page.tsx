import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VehicleDetail from "@/components/VehicleDetail";
import { getVehicle, getVehiclesByCategory, vehicleContent } from "@/lib/vehicles";
import { locales, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getVehiclesByCategory("tricycle").map((v) => ({ locale, slug: v.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const vehicle = getVehicle("tricycle", slug);
  if (!vehicle) return {};

  const content = vehicleContent(vehicle, locale);
  return {
    title: vehicle.slug.toUpperCase(),
    description: content.tagline,
  };
}

export default async function TricycleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const vehicle = getVehicle("tricycle", slug);
  if (!vehicle) notFound();

  const dict = await getDictionary(locale);

  return <VehicleDetail vehicle={vehicle} locale={locale} dict={dict} />;
}
