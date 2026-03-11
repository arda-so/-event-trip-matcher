import { getTicketmasterEnv } from "@/lib/env";
import type { TicketmasterEvent, TicketmasterEventResponse } from "@/data/providers/ticketmaster/types";

type ListTicketmasterEventsInput = {
  keyword?: string;
  city?: string;
  countryCode?: string;
  classificationName?: string;
  startDateTime?: string;
  endDateTime?: string;
  size?: number;
  page?: number;
};

export async function listTicketmasterEvents(input: ListTicketmasterEventsInput): Promise<TicketmasterEvent[]> {
  const { TICKETMASTER_API_KEY } = getTicketmasterEnv();
  const params = new URLSearchParams({
    apikey: TICKETMASTER_API_KEY,
    size: String(input.size ?? 50),
    page: String(input.page ?? 0),
    sort: "date,asc"
  });

  if (input.keyword) params.set("keyword", input.keyword);
  if (input.city) params.set("city", input.city);
  if (input.countryCode) params.set("countryCode", input.countryCode);
  if (input.classificationName) params.set("classificationName", input.classificationName);
  if (input.startDateTime) params.set("startDateTime", input.startDateTime);
  if (input.endDateTime) params.set("endDateTime", input.endDateTime);

  const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`, {
    headers: {
      accept: "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Ticketmaster request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as TicketmasterEventResponse;
  return payload._embedded?.events ?? [];
}

