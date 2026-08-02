import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getAllVehicles } from "@/lib/vehicles";

const siteUrl = "https://www.luxanaride.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of ["", "/scooters", "/tricycles", "/about", "/contact", "/privacy", "/terms"]) {
      routes.push({ url: `${siteUrl}/${locale}${path}`, lastModified: new Date() });
    }

    for (const vehicle of getAllVehicles()) {
      const segment = vehicle.category === "scooter" ? "scooters" : "tricycles";
      routes.push({
        url: `${siteUrl}/${locale}/${segment}/${vehicle.slug}`,
        lastModified: new Date(),
      });
    }
  }

  return routes;
}
