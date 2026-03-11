import Link from "next/link";
import { notFound } from "next/navigation";
import { getSearchDetails } from "@/data/repositories/trip-search-repository";

type SearchDetailsPageProps = {
  params: {
    searchId: string;
  };
};

export default async function SearchDetailsPage({ params }: SearchDetailsPageProps) {
  const search = await getSearchDetails(params.searchId);

  if (!search) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-rust">Persisted search</p>
          <h1 className="text-4xl font-semibold text-ink">
            {search.originCity.name} to concert matches
          </h1>
          <p className="text-sm leading-6 text-black/65">
            Search {search.id} · {new Date(search.createdAt).toLocaleString()}
          </p>
        </div>
        <Link href="/" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">
          Back to matcher
        </Link>
      </div>

      <section className="grid gap-4 rounded-[2rem] border border-black/10 bg-white/70 p-6 md:grid-cols-4">
        <Metric label="Origin" value={`${search.originCity.name}, ${search.originCity.countryCode}`} />
        <Metric label="Party size" value={String(search.partySize)} />
        <Metric label="Budget" value={search.maxBudget ? `EUR ${search.maxBudget}` : "Open"} />
        <Metric label="Options" value={String(search.options.length)} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-moss">Trip options</p>
          <h2 className="text-2xl font-semibold text-ink">Ranked persisted results</h2>
        </div>

        {search.options.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-black/10 bg-white/60 p-6 text-sm leading-7 text-black/60">
            This search was stored but no trip options passed the current matching rules.
          </div>
        ) : (
          search.options.map((option) => (
            <article
              key={option.id}
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

              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                <MetricCard label="Ticket" value={`EUR ${option.ticketEstimate}`} />
                <MetricCard label="Transport" value={`EUR ${option.transportEstimate}`} />
                <MetricCard label="Stay" value={`EUR ${option.stayEstimate}`} />
                <MetricCard label="Score" value={String(option.score)} />
              </div>

              <p className="mt-5 text-sm leading-6 text-black/70">{option.summary}</p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm text-black/45">{option.nights} night stay assumption</p>
                <a
                  href={option.event.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink"
                >
                  View ticket source
                </a>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-cloud/80 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-black/45">{label}</p>
      <p className="mt-2 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-cloud px-4 py-3">
      <p className="text-xs uppercase tracking-[0.14em] text-black/45">{label}</p>
      <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}

