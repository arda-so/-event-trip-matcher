import { prisma } from "@/lib/prisma";
import type { RecentSearchSummary, SearchDetails } from "@/types/trips";

export async function listRecentSearches(limit = 5): Promise<RecentSearchSummary[]> {
  const searches = await prisma.tripSearch.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: limit,
    include: {
      originCity: true,
      tripOptions: {
        orderBy: {
          score: "desc"
        },
        take: 1,
        include: {
          event: {
            include: {
              venue: {
                include: {
                  city: true
                }
              }
            }
          }
        }
      }
    }
  });

  return searches.map((search) => ({
    id: search.id,
    createdAt: search.createdAt.toISOString(),
    originCity: {
      id: search.originCity.id,
      slug: search.originCity.slug,
      name: search.originCity.name,
      countryCode: search.originCity.countryCode,
      hotelNightlyAvg: search.originCity.hotelNightlyAvg,
      transportCostBase: search.originCity.transportCostBase
    },
    maxBudget: search.maxBudget,
    partySize: search.partySize,
    bestOption: search.tripOptions[0]
      ? {
          eventTitle: search.tripOptions[0].event.title,
          eventStartsAt: search.tripOptions[0].event.startsAt.toISOString(),
          eventCityName: search.tripOptions[0].event.venue.city.name,
          totalEstimate: search.tripOptions[0].totalEstimate,
          score: search.tripOptions[0].score
        }
      : null
  }));
}

export async function getSearchDetails(searchId: string): Promise<SearchDetails | null> {
  const search = await prisma.tripSearch.findUnique({
    where: {
      id: searchId
    },
    include: {
      originCity: true,
      tripOptions: {
        orderBy: {
          score: "desc"
        },
        include: {
          event: {
            include: {
              venue: {
                include: {
                  city: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!search) {
    return null;
  }

  return {
    id: search.id,
    createdAt: search.createdAt.toISOString(),
    category: search.category,
    maxBudget: search.maxBudget,
    minBudget: search.minBudget,
    partySize: search.partySize,
    startDate: search.startDate.toISOString(),
    endDate: search.endDate.toISOString(),
    originCity: {
      id: search.originCity.id,
      slug: search.originCity.slug,
      name: search.originCity.name,
      countryCode: search.originCity.countryCode,
      hotelNightlyAvg: search.originCity.hotelNightlyAvg,
      transportCostBase: search.originCity.transportCostBase
    },
    options: search.tripOptions.map((option) => ({
      id: option.id,
      nights: option.nights,
      ticketEstimate: option.ticketEstimate,
      transportEstimate: option.transportEstimate,
      stayEstimate: option.stayEstimate,
      totalEstimate: option.totalEstimate,
      score: option.score,
      summary: option.summary,
      event: {
        id: option.event.id,
        slug: option.event.slug,
        title: option.event.title,
        startsAt: option.event.startsAt.toISOString(),
        externalUrl: option.event.externalUrl,
        venue: {
          id: option.event.venue.id,
          name: option.event.venue.name
        },
        city: {
          id: option.event.venue.city.id,
          slug: option.event.venue.city.slug,
          name: option.event.venue.city.name,
          countryCode: option.event.venue.city.countryCode,
          hotelNightlyAvg: option.event.venue.city.hotelNightlyAvg,
          transportCostBase: option.event.venue.city.transportCostBase
        }
      }
    }))
  };
}
