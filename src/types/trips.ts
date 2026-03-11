export type SeedCitySummary = {
  id: string;
  slug: string;
  name: string;
  countryCode: string;
  hotelNightlyAvg: number;
  transportCostBase: number;
};

export type SeedEventRecord = {
  id: string;
  slug: string;
  title: string;
  category: "concert" | "sports" | "conference" | "retreat" | "heritage";
  startsAt: string;
  endsAt: string | null;
  externalUrl: string;
  summary: string;
  minTicketPrice: number | null;
  maxTicketPrice: number | null;
  venue: {
    id: string;
    name: string;
    city: SeedCitySummary;
  };
};

export type SearchInput = {
  originCityId: string;
  category: SeedEventRecord["category"];
  maxBudget?: number;
  minBudget?: number;
  partySize: number;
  nightsMin?: number;
  nightsMax?: number;
  startDate: string;
  endDate: string;
};

export type TripOptionSummary = {
  event: {
    id: string;
    slug: string;
    title: string;
    startsAt: string;
    externalUrl: string;
    venue: {
      id: string;
      name: string;
    };
    city: SeedCitySummary;
  };
  nights: number;
  ticketEstimate: number;
  transportEstimate: number;
  stayEstimate: number;
  totalEstimate: number;
  score: number;
  summary: string;
};

export type SearchResult = {
  searchId: string;
  originCity: SeedCitySummary;
  options: TripOptionSummary[];
};

export type RecentSearchSummary = {
  id: string;
  createdAt: string;
  originCity: SeedCitySummary;
  maxBudget: number | null;
  partySize: number;
  bestOption: {
    eventTitle: string;
    eventStartsAt: string;
    eventCityName: string;
    totalEstimate: number;
    score: number;
  } | null;
};

export type SearchDetails = {
  id: string;
  createdAt: string;
  category: SeedEventRecord["category"];
  maxBudget: number | null;
  minBudget: number | null;
  partySize: number;
  startDate: string;
  endDate: string;
  originCity: SeedCitySummary;
  options: Array<
    TripOptionSummary & {
      id: string;
    }
  >;
};
