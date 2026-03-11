import { EventSource, EventStatus, ExperienceCategory, Prisma } from "@prisma/client";
import type { TicketmasterEvent } from "@/data/providers/ticketmaster/types";
import { slugify } from "@/lib/slugify";

type NormalizedImportRecord = {
  city: Prisma.CityUncheckedCreateInput;
  venue: {
    slug: string;
    name: string;
    addressLine: string | null;
    latitude: Prisma.Decimal | null;
    longitude: Prisma.Decimal | null;
  };
  event: {
    source: EventSource;
    sourceRef: string;
    slug: string;
    title: string;
    summary: string | null;
    category: ExperienceCategory;
    startsAt: Date;
    endsAt: Date | null;
    status: EventStatus;
    externalUrl: string;
    imageUrl: string | null;
    currency: string;
    minTicketPrice: number | null;
    maxTicketPrice: number | null;
  };
};

export function normalizeTicketmasterEvent(event: TicketmasterEvent): NormalizedImportRecord | null {
  const venue = event._embedded?.venues?.[0];
  const startsAt = resolveStartsAt(event);

  if (!venue?.name || !venue.city?.name || !startsAt || !event.url) {
    return null;
  }

  const countryCode = venue.country?.countryCode ?? "XX";
  const countryName = venue.country?.name ?? "Unknown";
  const citySlug = slugify(`${venue.city.name}-${countryCode}`);
  const venueSlug = slugify(`${venue.name}-${venue.city.name}-${countryCode}`);
  const image = pickBestImage(event.images ?? []);
  const price = event.priceRanges?.[0];

  return {
    city: {
      slug: citySlug,
      name: venue.city.name,
      countryCode,
      countryName,
      airportCode: null,
      timezone: venue.timezone ?? "UTC",
      latitude: toDecimal(venue.location?.latitude) ?? new Prisma.Decimal(0),
      longitude: toDecimal(venue.location?.longitude) ?? new Prisma.Decimal(0),
      hotelNightlyAvg: 180,
      transportCostBase: 120
    },
    venue: {
      slug: venueSlug,
      name: venue.name,
      addressLine: venue.address?.line1 ?? null,
      latitude: toDecimal(venue.location?.latitude),
      longitude: toDecimal(venue.location?.longitude)
    },
    event: {
      source: EventSource.ticketmaster,
      sourceRef: event.id,
      slug: slugify(`${event.name}-${venue.city.name}-${startsAt.toISOString().slice(0, 10)}`),
      title: event.name,
      summary: event.info ?? event.pleaseNote ?? null,
      category: mapCategory(event),
      startsAt,
      endsAt: event.dates?.end?.dateTime ? new Date(event.dates.end.dateTime) : null,
      status: mapStatus(event.dates?.status?.code),
      externalUrl: event.url,
      imageUrl: image?.url ?? null,
      currency: price?.currency ?? "EUR",
      minTicketPrice: price?.min ? Math.round(price.min) : null,
      maxTicketPrice: price?.max ? Math.round(price.max) : null
    }
  };
}

function resolveStartsAt(event: TicketmasterEvent) {
  const dateTime = event.dates?.start?.dateTime;
  if (dateTime) {
    return new Date(dateTime);
  }

  const localDate = event.dates?.start?.localDate;
  if (!localDate) {
    return null;
  }

  const localTime = event.dates?.start?.localTime ?? "19:00:00";
  return new Date(`${localDate}T${localTime}`);
}

function mapCategory(event: TicketmasterEvent) {
  const segment = event.classifications?.[0]?.segment?.name?.toLowerCase() ?? "";

  if (segment.includes("sports")) return ExperienceCategory.sports;
  if (segment.includes("arts") || segment.includes("film")) return ExperienceCategory.heritage;
  if (segment.includes("misc")) return ExperienceCategory.conference;
  return ExperienceCategory.concert;
}

function mapStatus(statusCode?: string) {
  switch (statusCode) {
    case "cancelled":
      return EventStatus.cancelled;
    case "offsale":
    case "postponed":
      return EventStatus.postponed;
    default:
      return EventStatus.scheduled;
  }
}

function pickBestImage(images: Array<{ url: string; width?: number; height?: number }>) {
  return [...images].sort((left, right) => (right.width ?? 0) * (right.height ?? 0) - (left.width ?? 0) * (left.height ?? 0))[0];
}

function toDecimal(value?: string) {
  if (!value) return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;
  return new Prisma.Decimal(parsed);
}
