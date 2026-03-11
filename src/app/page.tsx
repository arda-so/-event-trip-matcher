import Link from "next/link";
import { RecentSearches } from "@/components/search/recent-searches";
import { SearchShell } from "@/components/search/search-shell";
import { listCities } from "@/data/repositories/city-repository";
import { listRecentSearches } from "@/data/repositories/trip-search-repository";

export default async function HomePage() {
  const [cities, recentSearches] = await Promise.all([listCities(), listRecentSearches()]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 md:px-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-rust">Event-led trip matching</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
            Find a city worth traveling to because something meaningful is happening there.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-black/70">
            Event Trip Matcher helps users discover event-led trips by combining structured event data, destination
            context, and budget-aware ranking. The current focus is concert travel, with room to expand into other
            experience categories later.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/how-it-works" className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white">
              How it works
            </Link>
            <Link href="/about" className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-ink">
              About the product
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_24px_80px_rgba(17,17,17,0.08)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-moss">Public positioning</p>
            <Link href="/admin/imports" className="text-sm font-medium text-ink underline-offset-4 hover:underline">
              Admin imports
            </Link>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-black/75">
            <li>Public website and interactive web app in one codebase.</li>
            <li>Users discover trips first, then book with external providers.</li>
            <li>Structured event, venue, city, and trip-search data in Postgres.</li>
            <li>Built to support partner applications with a live public presence.</li>
          </ul>
        </div>
      </section>

      <SearchShell cities={cities} />
      <RecentSearches searches={recentSearches} />
    </main>
  );
}
