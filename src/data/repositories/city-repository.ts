import { prisma } from "@/lib/prisma";
import type { SeedCitySummary } from "@/types/trips";

export async function listCities(): Promise<SeedCitySummary[]> {
  const cities = await prisma.city.findMany({
    orderBy: [{ countryCode: "asc" }, { name: "asc" }]
  });

  return cities.map((city) => ({
    id: city.id,
    slug: city.slug,
    name: city.name,
    countryCode: city.countryCode,
    hotelNightlyAvg: city.hotelNightlyAvg,
    transportCostBase: city.transportCostBase
  }));
}

