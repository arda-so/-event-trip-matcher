import { listSearchableEvents } from "@/data/repositories/event-repository";
import { getSeedCityById } from "@/data/seed/cities";
import { scoreTripOption } from "@/domain/trips/score-trip-option";
import { prisma } from "@/lib/prisma";
import type { SearchInput, SearchResult } from "@/types/trips";

export async function findTripMatches(input: SearchInput): Promise<SearchResult> {
  const originCity = getSeedCityById(input.originCityId);

  if (!originCity) {
    throw new Error("Origin city not found.");
  }

  const events = await listSearchableEvents(input);

  const options = events
    .map((event) => scoreTripOption(originCity, event, input))
    .filter((option) => option !== null)
    .sort((left, right) => right.score - left.score);

  const search = await prisma.tripSearch.create({
    data: {
      originCityId: input.originCityId,
      category: input.category,
      minBudget: input.minBudget,
      maxBudget: input.maxBudget,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
      partySize: input.partySize,
      nightsMin: input.nightsMin ?? 1,
      nightsMax: input.nightsMax ?? 3,
      tripOptions: {
        create: options.map((option) => ({
          eventId: option.event.id,
          travelStart: new Date(option.event.startsAt),
          travelEnd: buildTravelEnd(option.event.startsAt, option.nights),
          nights: option.nights,
          ticketEstimate: option.ticketEstimate,
          transportEstimate: option.transportEstimate,
          stayEstimate: option.stayEstimate,
          totalEstimate: option.totalEstimate,
          score: option.score,
          summary: option.summary
        }))
      }
    },
    include: {
      tripOptions: true
    }
  });

  return {
    originCity,
    searchId: search.id,
    options
  };
}

function buildTravelEnd(startsAtIso: string, nights: number) {
  const start = new Date(startsAtIso);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + nights);
  return end;
}
