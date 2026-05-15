import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/8 bg-white/45">
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 text-sm text-black/60 md:px-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="font-medium text-ink">{siteConfig.name}</p>
          <p className="mt-2 max-w-xl leading-6">
            {siteConfig.name} is a relationship-focused MVP built around weekly reflection, repair, intimacy, and
            shared momentum.
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-4 md:justify-end">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
