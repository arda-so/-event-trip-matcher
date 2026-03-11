import type { SeedCitySummary } from "@/types/trips";

const seedCities: SeedCitySummary[] = [
  {
    id: "city_dublin",
    slug: "dublin",
    name: "Dublin",
    countryCode: "IE",
    hotelNightlyAvg: 170,
    transportCostBase: 0
  },
  {
    id: "city_london",
    slug: "london",
    name: "London",
    countryCode: "GB",
    hotelNightlyAvg: 210,
    transportCostBase: 95
  },
  {
    id: "city_amsterdam",
    slug: "amsterdam",
    name: "Amsterdam",
    countryCode: "NL",
    hotelNightlyAvg: 190,
    transportCostBase: 120
  },
  {
    id: "city_barcelona",
    slug: "barcelona",
    name: "Barcelona",
    countryCode: "ES",
    hotelNightlyAvg: 165,
    transportCostBase: 150
  }
];

export function listSeedCities() {
  return seedCities;
}

export function getSeedCityById(cityId: string) {
  return seedCities.find((city) => city.id === cityId) ?? null;
}

