"use client";

import { useState } from "react";
import type { SearchResult, SeedCitySummary } from "@/types/trips";

type SearchShellProps = {
  cities: SeedCitySummary[];
};

const defaultDateWindow = {
  startDate: "2026-06-01",
  endDate: "2026-08-31"
};

export function SearchShell({ cities }: SearchShellProps) {
  const [originCityId, setOriginCityId] = useState(cities[0]?.id ?? "");
  const [maxBudget, setMaxBudget] = useState("450");
  const [partySize, setPartySize] = useState("1");
  const [startDate, setStartDate] = useState(defaultDateWindow.startDate);
  const [endDate, setEndDate] = useState(defaultDateWindow.endDate);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          originCityId,
          category: "concert",
          maxBudget: Number(maxBudget),
          partySize: Number(partySize),
          startDate,
          endDate
        })
      });

      const payload = (await response.json()) as SearchResult & { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Search failed.");
      }

      setResults(payload);
    } catch (requestError) {
      setResults(null);
      setError((requestError as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form
        onSubmit={submitSearch}
        className="rounded-[2rem] border border-black/10 bg-sand/80 p-6 shadow-[0_24px_80px_rgba(17,17,17,0.06)]"
      >
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-rust">Search the first wedge</p>
          <h2 className="text-2xl font-semibold text-ink">Concert trip matcher</h2>
          <p className="text-sm leading-6 text-black/70">
            Search a seeded dataset first. This keeps the codepath clean while we prepare real event ingestion.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-black/75">Travel from</span>
            <select
              value={originCityId}
              onChange={(event) => setOriginCityId(event.target.value)}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.countryCode}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="font-medium text-black/75">Max budget (EUR)</span>
              <input
                value={maxBudget}
                onChange={(event) => setMaxBudget(event.target.value)}
                type="number"
                min="50"
                step="10"
                className="rounded-2xl border border-black/10 bg-white px-4 py-3"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="font-medium text-black/75">Party size</span>
              <input
                value={partySize}
                onChange={(event) => setPartySize(event.target.value)}
                type="number"
                min="1"
                max="6"
                className="rounded-2xl border border-black/10 bg-white px-4 py-3"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="font-medium text-black/75">Start date</span>
              <input
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                type="date"
                className="rounded-2xl border border-black/10 bg-white px-4 py-3"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="font-medium text-black/75">End date</span>
              <input
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                type="date"
                className="rounded-2xl border border-black/10 bg-white px-4 py-3"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="mt-6 inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {busy ? "Matching trips..." : "Find matching trips"}
        </button>

        {error ? <p className="mt-4 text-sm text-rust">{error}</p> : null}
      </form>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-moss">Results</p>
            <h2 className="text-2xl font-semibold text-ink">Best current options</h2>
          </div>
          {results ? (
            <div className="text-right text-sm text-black/60">
              <p>{results.options.length} matches</p>
              <p className="text-xs">Search {results.searchId.slice(-6)}</p>
            </div>
          ) : null}
        </div>

        {!results ? (
          <div className="rounded-[2rem] border border-dashed border-black/15 bg-white/60 p-6 text-sm leading-7 text-black/65">
            Search to generate trip options. The API returns a ranked list built from a single shared matching service.
          </div>
        ) : null}

        {results?.options.map((option) => (
          <article
            key={option.event.id}
            className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-[0_16px_56px_rgba(17,17,17,0.06)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.18em] text-rust">{option.event.city.name}</p>
                <h3 className="text-2xl font-semibold text-ink">{option.event.title}</h3>
                <p className="text-sm leading-6 text-black/70">
                  {option.event.venue.name} · {new Date(option.event.startsAt).toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl bg-ink px-4 py-3 text-right text-white">
                <p className="text-xs uppercase tracking-[0.16em] text-white/70">Estimated total</p>
                <p className="text-2xl font-semibold">EUR {option.totalEstimate}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <CostBox label="Ticket" value={option.ticketEstimate} />
              <CostBox label="Transport" value={option.transportEstimate} />
              <CostBox label="Stay" value={option.stayEstimate} />
            </div>

            <p className="mt-5 text-sm leading-6 text-black/70">{option.summary}</p>

            <div className="mt-5 flex items-center justify-between gap-4 text-sm">
              <p className="text-black/45">Score {option.score}</p>
              <a
                href={`/searches/${results.searchId}`}
                className="rounded-full border border-black/10 bg-white px-4 py-2 font-medium text-ink"
              >
                Open persisted result
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CostBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-cloud px-4 py-3">
      <p className="text-xs uppercase tracking-[0.14em] text-black/45">{label}</p>
      <p className="mt-1 text-lg font-semibold text-ink">EUR {value}</p>
    </div>
  );
}
