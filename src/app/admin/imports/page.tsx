import Link from "next/link";
import { TicketmasterImportPanel } from "@/components/admin/ticketmaster-import-panel";

export default function AdminImportsPage() {
  const hasApiKey = Boolean(process.env.TICKETMASTER_API_KEY);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-10 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-rust">Internal tools</p>
          <h1 className="text-4xl font-semibold text-ink">Imports</h1>
          <p className="max-w-2xl text-sm leading-6 text-black/65">
            Run provider ingestion without touching the schema or the ranking engine. Ticketmaster is the first adapter.
          </p>
        </div>
        <Link href="/" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink">
          Back to home
        </Link>
      </div>

      <TicketmasterImportPanel hasApiKey={hasApiKey} />
    </main>
  );
}

