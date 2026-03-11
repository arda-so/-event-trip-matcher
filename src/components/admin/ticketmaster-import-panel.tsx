"use client";

import { useState } from "react";

type TicketmasterImportPanelProps = {
  hasApiKey: boolean;
};

type ImportResult = {
  fetched: number;
  imported: number;
  skipped: number;
};

export function TicketmasterImportPanel({ hasApiKey }: TicketmasterImportPanelProps) {
  const [city, setCity] = useState("Dublin");
  const [countryCode, setCountryCode] = useState("IE");
  const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState("20");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ImportResult | null>(null);

  async function submitImport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/imports/ticketmaster", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          city: city || undefined,
          countryCode: countryCode || undefined,
          keyword: keyword || undefined,
          classificationName: "music",
          size: Number(size)
        })
      });

      const payload = (await response.json()) as ImportResult & { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Import failed.");
      }

      setResult(payload);
    } catch (requestError) {
      setResult(null);
      setError((requestError as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_24px_80px_rgba(17,17,17,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-rust">Admin import</p>
          <h2 className="text-2xl font-semibold text-ink">Ticketmaster ingestion</h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            hasApiKey ? "bg-moss/15 text-moss" : "bg-rust/10 text-rust"
          }`}
        >
          {hasApiKey ? "API key detected" : "API key missing"}
        </span>
      </div>

      <form onSubmit={submitImport} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-black/75">City</span>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="rounded-2xl border border-black/10 bg-white px-4 py-3"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-black/75">Country code</span>
          <input
            value={countryCode}
            onChange={(event) => setCountryCode(event.target.value.toUpperCase())}
            maxLength={2}
            className="rounded-2xl border border-black/10 bg-white px-4 py-3"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-black/75">Keyword</span>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Optional artist or event keyword"
            className="rounded-2xl border border-black/10 bg-white px-4 py-3"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-black/75">Batch size</span>
          <input
            value={size}
            onChange={(event) => setSize(event.target.value)}
            type="number"
            min="1"
            max="100"
            className="rounded-2xl border border-black/10 bg-white px-4 py-3"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={busy || !hasApiKey}
            className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {busy ? "Importing..." : "Run import"}
          </button>
        </div>
      </form>

      {error ? <p className="mt-4 text-sm text-rust">{error}</p> : null}

      {result ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Metric label="Fetched" value={String(result.fetched)} />
          <Metric label="Imported" value={String(result.imported)} />
          <Metric label="Skipped" value={String(result.skipped)} />
        </div>
      ) : null}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-cloud px-4 py-3">
      <p className="text-xs uppercase tracking-[0.14em] text-black/45">{label}</p>
      <p className="mt-1 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}

