import { PageFrame } from "@/components/site/page-frame";
import { siteConfig } from "@/lib/site-config";

export default function TermsPage() {
  return (
    <PageFrame
      eyebrow="Terms"
      title="Terms of Use"
      intro="These terms are a product placeholder and should be reviewed before the site is used publicly for partner applications or user acquisition."
    >
      <div className="space-y-5 text-sm leading-7 text-black/75">
        <p>
          {siteConfig.legalName} provides informational trip matching and discovery tools. Prices, availability,
          schedules, and provider terms can change after results are shown.
        </p>
        <p>
          Users are responsible for reviewing final booking terms, refund rules, and travel requirements on the
          relevant third-party provider website before purchasing.
        </p>
        <p>
          The service may contain estimated costs and links to external booking providers. We make no guarantee that
          third-party information remains unchanged after display.
        </p>
        <p>
          These terms are governed by the laws of <span className="font-medium text-ink">{siteConfig.jurisdiction}</span>,
          unless replaced by your final published legal terms.
        </p>
        <p className="rounded-2xl border border-rust/20 bg-rust/5 px-4 py-3 text-rust">{siteConfig.statusNote}</p>
      </div>
    </PageFrame>
  );
}
