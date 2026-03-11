import Link from "next/link";
import type { RecentSearchSummary } from "@/types/trips";

type RecentSearchesProps = {
  searches: RecentSearchSummary[];
};

export function RecentSearches({ searches }: RecentSearchesProps) {
  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_24px_80px_rgba(17,17,17,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-moss">Recent searches</p>
          <h2 className="text-2xl font-semibold text-ink">Persisted search history</h2>
        </div>
        <p className="text-sm text-black/55">{searches.length} stored</p>
      </div>

      {searches.length === 0 ? (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-black/10 bg-cloud/70 p-5 text-sm leading-7 text-black/60">
          No persisted searches yet. Run a match and the best option will appear here from Postgres.
        </div>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {searches.map((search) => (
            <article key={search.id} className="rounded-[1.5rem] border border-black/10 bg-cloud/80 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-rust">
                    From {search.originCity.name}, {search.originCity.countryCode}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">
                    {search.bestOption?.eventTitle ?? "No viable trip option"}
                  </h3>
                </div>
                <p className="text-xs text-black/50">{formatTime(search.createdAt)}</p>
              </div>

              <p className="mt-3 text-sm leading-6 text-black/70">
                {search.bestOption
                  ? `${search.bestOption.eventCityName} · ${formatEventTime(search.bestOption.eventStartsAt)}`
                  : "Search stored without a matching option."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <Badge label={`Party ${search.partySize}`} />
                {search.maxBudget ? <Badge label={`Max EUR ${search.maxBudget}`} /> : null}
                {search.bestOption ? <Badge label={`Best EUR ${search.bestOption.totalEstimate}`} /> : null}
              </div>

              <div className="mt-4">
                <Link
                  href={`/searches/${search.id}`}
                  className="inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink"
                >
                  Open search
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Badge({ label }: { label: string }) {
  return <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">{label}</span>;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString();
}

function formatEventTime(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
