import type { SeedEventRecord } from "@/types/trips";

const seededEvents: SeedEventRecord[] = [
  {
    id: "event_dublin_aurora_lights",
    slug: "aurora-lights-dublin-june-2026",
    title: "Aurora Lights Tour",
    category: "concert",
    startsAt: "2026-06-18T19:30:00.000Z",
    endsAt: "2026-06-18T22:15:00.000Z",
    externalUrl: "https://example.com/events/aurora-lights-dublin",
    summary: "Indoor synth-pop headline show.",
    minTicketPrice: 69,
    maxTicketPrice: 99,
    venue: {
      id: "venue_3arena",
      name: "3Arena",
      city: {
        id: "city_dublin",
        slug: "dublin",
        name: "Dublin",
        countryCode: "IE",
        hotelNightlyAvg: 170,
        transportCostBase: 0
      }
    }
  },
  {
    id: "event_london_aurora_lights",
    slug: "aurora-lights-london-june-2026",
    title: "Aurora Lights Tour",
    category: "concert",
    startsAt: "2026-06-20T19:00:00.000Z",
    endsAt: "2026-06-20T22:30:00.000Z",
    externalUrl: "https://example.com/events/aurora-lights-london",
    summary: "Arena show with expanded visual production.",
    minTicketPrice: 74,
    maxTicketPrice: 115,
    venue: {
      id: "venue_o2",
      name: "The O2",
      city: {
        id: "city_london",
        slug: "london",
        name: "London",
        countryCode: "GB",
        hotelNightlyAvg: 210,
        transportCostBase: 95
      }
    }
  },
  {
    id: "event_amsterdam_midnight_radio",
    slug: "midnight-radio-amsterdam-july-2026",
    title: "Midnight Radio Live",
    category: "concert",
    startsAt: "2026-07-11T18:30:00.000Z",
    endsAt: "2026-07-11T22:00:00.000Z",
    externalUrl: "https://example.com/events/midnight-radio-amsterdam",
    summary: "Late-summer indie headline date.",
    minTicketPrice: 58,
    maxTicketPrice: 89,
    venue: {
      id: "venue_ziggo",
      name: "Ziggo Dome",
      city: {
        id: "city_amsterdam",
        slug: "amsterdam",
        name: "Amsterdam",
        countryCode: "NL",
        hotelNightlyAvg: 190,
        transportCostBase: 120
      }
    }
  },
  {
    id: "event_barcelona_golden_hour",
    slug: "golden-hour-barcelona-july-2026",
    title: "Golden Hour Sessions",
    category: "concert",
    startsAt: "2026-07-25T19:30:00.000Z",
    endsAt: "2026-07-25T23:00:00.000Z",
    externalUrl: "https://example.com/events/golden-hour-barcelona",
    summary: "Summer concert with two support acts.",
    minTicketPrice: 64,
    maxTicketPrice: 98,
    venue: {
      id: "venue_palau",
      name: "Palau Sant Jordi",
      city: {
        id: "city_barcelona",
        slug: "barcelona",
        name: "Barcelona",
        countryCode: "ES",
        hotelNightlyAvg: 165,
        transportCostBase: 150
      }
    }
  }
];

export function listSeedEvents() {
  return seededEvents;
}

