import { prisma } from "@/lib/prisma";
import type { SearchInput, SeedEventRecord } from "@/types/trips";

export async function listSearchableEvents(input: SearchInput): Promise<SeedEventRecord[]> {
  const events = await prisma.event.findMany({
    where: {
      category: input.category,
      startsAt: {
        gte: new Date(input.startDate),
        lte: new Date(input.endDate)
      },
      status: "scheduled"
    },
    include: {
      venue: {
        include: {
          city: true
        }
      }
    },
    orderBy: {
      startsAt: "asc"
    }
  });

  return events.map((event) => ({
    id: event.id,
    slug: event.slug,
    title: event.title,
    category: event.category,
    startsAt: event.startsAt.toISOString(),
    endsAt: event.endsAt?.toISOString() ?? null,
    externalUrl: event.externalUrl,
    summary: event.summary ?? "",
    minTicketPrice: event.minTicketPrice,
    maxTicketPrice: event.maxTicketPrice,
    venue: {
      id: event.venue.id,
      name: event.venue.name,
      city: {
        id: event.venue.city.id,
        slug: event.venue.city.slug,
        name: event.venue.city.name,
        countryCode: event.venue.city.countryCode,
        hotelNightlyAvg: event.venue.city.hotelNightlyAvg,
        transportCostBase: event.venue.city.transportCostBase
      }
    }
  }));
}
