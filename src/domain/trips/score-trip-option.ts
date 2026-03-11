import type { SearchInput, SeedCitySummary, SeedEventRecord, TripOptionSummary } from "@/types/trips";

export function scoreTripOption(
  originCity: SeedCitySummary,
  event: SeedEventRecord,
  input: SearchInput
): TripOptionSummary | null {
  const eventDate = new Date(event.startsAt);
  const day = eventDate.getUTCDay();
  const city = event.venue.city;
  const nightsFloor = input.nightsMin ?? 1;
  const weekendNights = day === 5 || day === 6 ? 2 : 1;
  const nights = Math.max(nightsFloor, Math.min(input.nightsMax ?? weekendNights, weekendNights));
  const ticketEstimate = event.minTicketPrice ?? 70;
  const isLocal = originCity.id === city.id;
  const travelMultiplier = isLocal ? 0.2 : 1;
  const transportEstimate = Math.round((city.transportCostBase + 35) * travelMultiplier * input.partySize);
  const stayEstimate = isLocal ? 0 : city.hotelNightlyAvg * nights * input.partySize;
  const totalEstimate = ticketEstimate * input.partySize + transportEstimate + stayEstimate;
  const affordabilityTarget = input.maxBudget ?? totalEstimate;
  const affordabilityScore = Math.max(0, 100 - Math.max(0, totalEstimate - affordabilityTarget) / 4);
  const distancePenalty = isLocal ? 0 : city.transportCostBase / 5;
  const score = Number((140 + affordabilityScore - distancePenalty - stayEstimate / 25).toFixed(2));

  if (input.maxBudget && totalEstimate > input.maxBudget * 1.25) {
    return null;
  }

  if (input.minBudget && totalEstimate < input.minBudget) {
    return null;
  }

  return {
    event: {
      id: event.id,
      slug: event.slug,
      title: event.title,
      startsAt: event.startsAt,
      externalUrl: event.externalUrl,
      venue: {
        id: event.venue.id,
        name: event.venue.name
      },
      city
    },
    nights,
    ticketEstimate: ticketEstimate * input.partySize,
    transportEstimate,
    stayEstimate,
    totalEstimate,
    score,
    summary:
      isLocal
        ? "Local match. No hotel needed and only light transport cost assumed."
        : `${nights}-night trip based on city-average stay costs and a simple transport estimate from ${originCity.name}.`
  };
}

