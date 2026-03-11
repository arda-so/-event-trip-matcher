import { PrismaClient, EventSource, EventStatus, ExperienceCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const cities = await Promise.all([
    prisma.city.upsert({
      where: { id: "city_dublin" },
      update: {
        slug: "dublin",
        name: "Dublin",
        countryCode: "IE",
        countryName: "Ireland",
        airportCode: "DUB",
        timezone: "Europe/Dublin",
        latitude: "53.349805",
        longitude: "-6.260310",
        hotelNightlyAvg: 170,
        transportCostBase: 0
      },
      create: {
        id: "city_dublin",
        slug: "dublin",
        name: "Dublin",
        countryCode: "IE",
        countryName: "Ireland",
        airportCode: "DUB",
        timezone: "Europe/Dublin",
        latitude: "53.349805",
        longitude: "-6.260310",
        hotelNightlyAvg: 170,
        transportCostBase: 0
      }
    }),
    prisma.city.upsert({
      where: { id: "city_london" },
      update: {
        slug: "london",
        name: "London",
        countryCode: "GB",
        countryName: "United Kingdom",
        airportCode: "LHR",
        timezone: "Europe/London",
        latitude: "51.507218",
        longitude: "-0.127586",
        hotelNightlyAvg: 210,
        transportCostBase: 95
      },
      create: {
        id: "city_london",
        slug: "london",
        name: "London",
        countryCode: "GB",
        countryName: "United Kingdom",
        airportCode: "LHR",
        timezone: "Europe/London",
        latitude: "51.507218",
        longitude: "-0.127586",
        hotelNightlyAvg: 210,
        transportCostBase: 95
      }
    }),
    prisma.city.upsert({
      where: { id: "city_amsterdam" },
      update: {
        slug: "amsterdam",
        name: "Amsterdam",
        countryCode: "NL",
        countryName: "Netherlands",
        airportCode: "AMS",
        timezone: "Europe/Amsterdam",
        latitude: "52.367573",
        longitude: "4.904139",
        hotelNightlyAvg: 190,
        transportCostBase: 120
      },
      create: {
        id: "city_amsterdam",
        slug: "amsterdam",
        name: "Amsterdam",
        countryCode: "NL",
        countryName: "Netherlands",
        airportCode: "AMS",
        timezone: "Europe/Amsterdam",
        latitude: "52.367573",
        longitude: "4.904139",
        hotelNightlyAvg: 190,
        transportCostBase: 120
      }
    }),
    prisma.city.upsert({
      where: { id: "city_barcelona" },
      update: {
        slug: "barcelona",
        name: "Barcelona",
        countryCode: "ES",
        countryName: "Spain",
        airportCode: "BCN",
        timezone: "Europe/Madrid",
        latitude: "41.387397",
        longitude: "2.168568",
        hotelNightlyAvg: 165,
        transportCostBase: 150
      },
      create: {
        id: "city_barcelona",
        slug: "barcelona",
        name: "Barcelona",
        countryCode: "ES",
        countryName: "Spain",
        airportCode: "BCN",
        timezone: "Europe/Madrid",
        latitude: "41.387397",
        longitude: "2.168568",
        hotelNightlyAvg: 165,
        transportCostBase: 150
      }
    })
  ]);

  const cityBySlug = Object.fromEntries(cities.map((city) => [city.slug, city]));

  const venues = await Promise.all([
    prisma.venue.upsert({
      where: { id: "venue_3arena" },
      update: {
        slug: "3arena-dublin",
        cityId: cityBySlug.dublin.id,
        name: "3Arena",
        addressLine: "North Wall Quay"
      },
      create: {
        id: "venue_3arena",
        slug: "3arena-dublin",
        cityId: cityBySlug.dublin.id,
        name: "3Arena",
        addressLine: "North Wall Quay"
      }
    }),
    prisma.venue.upsert({
      where: { id: "venue_o2" },
      update: {
        slug: "o2-arena-london",
        cityId: cityBySlug.london.id,
        name: "The O2",
        addressLine: "Peninsula Square"
      },
      create: {
        id: "venue_o2",
        slug: "o2-arena-london",
        cityId: cityBySlug.london.id,
        name: "The O2",
        addressLine: "Peninsula Square"
      }
    }),
    prisma.venue.upsert({
      where: { id: "venue_ziggo" },
      update: {
        slug: "ziggo-dome-amsterdam",
        cityId: cityBySlug.amsterdam.id,
        name: "Ziggo Dome",
        addressLine: "De Passage 100"
      },
      create: {
        id: "venue_ziggo",
        slug: "ziggo-dome-amsterdam",
        cityId: cityBySlug.amsterdam.id,
        name: "Ziggo Dome",
        addressLine: "De Passage 100"
      }
    }),
    prisma.venue.upsert({
      where: { id: "venue_palau" },
      update: {
        slug: "palau-sant-jordi-barcelona",
        cityId: cityBySlug.barcelona.id,
        name: "Palau Sant Jordi",
        addressLine: "Passeig Olimpic"
      },
      create: {
        id: "venue_palau",
        slug: "palau-sant-jordi-barcelona",
        cityId: cityBySlug.barcelona.id,
        name: "Palau Sant Jordi",
        addressLine: "Passeig Olimpic"
      }
    })
  ]);

  const venueBySlug = Object.fromEntries(venues.map((venue) => [venue.slug, venue]));

  await Promise.all([
    prisma.event.upsert({
      where: { id: "event_dublin_aurora_lights" },
      update: {
        slug: "aurora-lights-dublin-june-2026",
        venueId: venueBySlug["3arena-dublin"].id,
        title: "Aurora Lights Tour",
        summary: "Indoor synth-pop headline show.",
        category: ExperienceCategory.concert,
        startsAt: new Date("2026-06-18T19:30:00.000Z"),
        endsAt: new Date("2026-06-18T22:15:00.000Z"),
        status: EventStatus.scheduled,
        source: EventSource.seeded,
        sourceRef: "seed-aurora-dublin-2026-06-18",
        externalUrl: "https://example.com/events/aurora-lights-dublin",
        minTicketPrice: 69,
        maxTicketPrice: 99
      },
      create: {
        id: "event_dublin_aurora_lights",
        slug: "aurora-lights-dublin-june-2026",
        venueId: venueBySlug["3arena-dublin"].id,
        title: "Aurora Lights Tour",
        summary: "Indoor synth-pop headline show.",
        category: ExperienceCategory.concert,
        startsAt: new Date("2026-06-18T19:30:00.000Z"),
        endsAt: new Date("2026-06-18T22:15:00.000Z"),
        status: EventStatus.scheduled,
        source: EventSource.seeded,
        sourceRef: "seed-aurora-dublin-2026-06-18",
        externalUrl: "https://example.com/events/aurora-lights-dublin",
        minTicketPrice: 69,
        maxTicketPrice: 99
      }
    }),
    prisma.event.upsert({
      where: { id: "event_london_aurora_lights" },
      update: {
        slug: "aurora-lights-london-june-2026",
        venueId: venueBySlug["o2-arena-london"].id,
        title: "Aurora Lights Tour",
        summary: "Arena show with expanded visual production.",
        category: ExperienceCategory.concert,
        startsAt: new Date("2026-06-20T19:00:00.000Z"),
        endsAt: new Date("2026-06-20T22:30:00.000Z"),
        status: EventStatus.scheduled,
        source: EventSource.seeded,
        sourceRef: "seed-aurora-london-2026-06-20",
        externalUrl: "https://example.com/events/aurora-lights-london",
        minTicketPrice: 74,
        maxTicketPrice: 115
      },
      create: {
        id: "event_london_aurora_lights",
        slug: "aurora-lights-london-june-2026",
        venueId: venueBySlug["o2-arena-london"].id,
        title: "Aurora Lights Tour",
        summary: "Arena show with expanded visual production.",
        category: ExperienceCategory.concert,
        startsAt: new Date("2026-06-20T19:00:00.000Z"),
        endsAt: new Date("2026-06-20T22:30:00.000Z"),
        status: EventStatus.scheduled,
        source: EventSource.seeded,
        sourceRef: "seed-aurora-london-2026-06-20",
        externalUrl: "https://example.com/events/aurora-lights-london",
        minTicketPrice: 74,
        maxTicketPrice: 115
      }
    }),
    prisma.event.upsert({
      where: { id: "event_amsterdam_midnight_radio" },
      update: {
        slug: "midnight-radio-amsterdam-july-2026",
        venueId: venueBySlug["ziggo-dome-amsterdam"].id,
        title: "Midnight Radio Live",
        summary: "Late-summer indie headline date.",
        category: ExperienceCategory.concert,
        startsAt: new Date("2026-07-11T18:30:00.000Z"),
        endsAt: new Date("2026-07-11T22:00:00.000Z"),
        status: EventStatus.scheduled,
        source: EventSource.seeded,
        sourceRef: "seed-midnight-radio-amsterdam-2026-07-11",
        externalUrl: "https://example.com/events/midnight-radio-amsterdam",
        minTicketPrice: 58,
        maxTicketPrice: 89
      },
      create: {
        id: "event_amsterdam_midnight_radio",
        slug: "midnight-radio-amsterdam-july-2026",
        venueId: venueBySlug["ziggo-dome-amsterdam"].id,
        title: "Midnight Radio Live",
        summary: "Late-summer indie headline date.",
        category: ExperienceCategory.concert,
        startsAt: new Date("2026-07-11T18:30:00.000Z"),
        endsAt: new Date("2026-07-11T22:00:00.000Z"),
        status: EventStatus.scheduled,
        source: EventSource.seeded,
        sourceRef: "seed-midnight-radio-amsterdam-2026-07-11",
        externalUrl: "https://example.com/events/midnight-radio-amsterdam",
        minTicketPrice: 58,
        maxTicketPrice: 89
      }
    }),
    prisma.event.upsert({
      where: { id: "event_barcelona_golden_hour" },
      update: {
        slug: "golden-hour-barcelona-july-2026",
        venueId: venueBySlug["palau-sant-jordi-barcelona"].id,
        title: "Golden Hour Sessions",
        summary: "Summer concert with two support acts.",
        category: ExperienceCategory.concert,
        startsAt: new Date("2026-07-25T19:30:00.000Z"),
        endsAt: new Date("2026-07-25T23:00:00.000Z"),
        status: EventStatus.scheduled,
        source: EventSource.seeded,
        sourceRef: "seed-golden-hour-barcelona-2026-07-25",
        externalUrl: "https://example.com/events/golden-hour-barcelona",
        minTicketPrice: 64,
        maxTicketPrice: 98
      },
      create: {
        id: "event_barcelona_golden_hour",
        slug: "golden-hour-barcelona-july-2026",
        venueId: venueBySlug["palau-sant-jordi-barcelona"].id,
        title: "Golden Hour Sessions",
        summary: "Summer concert with two support acts.",
        category: ExperienceCategory.concert,
        startsAt: new Date("2026-07-25T19:30:00.000Z"),
        endsAt: new Date("2026-07-25T23:00:00.000Z"),
        status: EventStatus.scheduled,
        source: EventSource.seeded,
        sourceRef: "seed-golden-hour-barcelona-2026-07-25",
        externalUrl: "https://example.com/events/golden-hour-barcelona",
        minTicketPrice: 64,
        maxTicketPrice: 98
      }
    })
  ]);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
