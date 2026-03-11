import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { listTicketmasterEvents } from "@/data/providers/ticketmaster/client";
import { normalizeTicketmasterEvent } from "@/data/providers/ticketmaster/normalize";

type ImportTicketmasterEventsInput = {
  keyword?: string;
  city?: string;
  countryCode?: string;
  classificationName?: string;
  startDateTime?: string;
  endDateTime?: string;
  size?: number;
};

export async function importTicketmasterEvents(input: ImportTicketmasterEventsInput) {
  const sourceEvents = await listTicketmasterEvents(input);
  let imported = 0;
  let skipped = 0;

  for (const sourceEvent of sourceEvents) {
    const normalized = normalizeTicketmasterEvent(sourceEvent);

    if (!normalized) {
      skipped += 1;
      continue;
    }

    const city = await prisma.city.upsert({
      where: {
        slug: normalized.city.slug
      },
      update: {
        name: normalized.city.name,
        countryCode: normalized.city.countryCode,
        countryName: normalized.city.countryName,
        timezone: normalized.city.timezone,
        latitude: normalized.city.latitude,
        longitude: normalized.city.longitude
      },
      create: normalized.city
    });

    const venue = await prisma.venue.upsert({
      where: {
        slug: normalized.venue.slug
      },
      update: {
        name: normalized.venue.name,
        addressLine: normalized.venue.addressLine,
        latitude: normalized.venue.latitude,
        longitude: normalized.venue.longitude,
        cityId: city.id
      },
      create: {
        ...normalized.venue,
        cityId: city.id
      }
    });

    const existingEvent = await prisma.event.findFirst({
      where: {
        source: normalized.event.source,
        sourceRef: normalized.event.sourceRef
      },
      select: {
        id: true
      }
    });

    const eventData = {
      slug: uniqueEventSlug(normalized.event.slug, normalized.event.sourceRef),
      title: normalized.event.title,
      summary: normalized.event.summary,
      category: normalized.event.category,
      startsAt: normalized.event.startsAt,
      endsAt: normalized.event.endsAt,
      status: normalized.event.status,
      externalUrl: normalized.event.externalUrl,
      imageUrl: normalized.event.imageUrl,
      currency: normalized.event.currency,
      minTicketPrice: normalized.event.minTicketPrice,
      maxTicketPrice: normalized.event.maxTicketPrice,
      venueId: venue.id
    };

    if (existingEvent) {
      await prisma.event.update({
        where: {
          id: existingEvent.id
        },
        data: eventData
      });
    } else {
      await prisma.event.create({
        data: {
          ...eventData,
          source: normalized.event.source,
          sourceRef: normalized.event.sourceRef
        }
      });
    }

    imported += 1;
  }

  return {
    fetched: sourceEvents.length,
    imported,
    skipped
  };
}

function uniqueEventSlug(baseSlug: string, sourceRef: string) {
  return slugify(`${baseSlug}-${sourceRef.slice(-6)}`);
}
