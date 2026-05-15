import { PageFrame } from "@/components/site/page-frame";
import { siteConfig } from "@/lib/site-config";

export default function TermsPage() {
  return (
    <PageFrame
      eyebrow="Terms"
      title="Terms of Use"
      intro="These terms are placeholders for a private relationship app prototype and should be reviewed before public use."
    >
      <div className="space-y-5 text-sm leading-7 text-black/75">
        <p>
          {siteConfig.legalName} provides relationship journaling, reflection, and planning tools. The app is intended
          as a self-guided support tool, not therapy, counseling, or crisis care.
        </p>
        <p>
          Users remain responsible for how they interpret and use any prompts, notes, or stored content. If serious
          relationship harm, abuse, or mental health risk is present, professional support should be used instead of
          relying on software alone.
        </p>
        <p>
          The service may contain placeholder content, sample prompts, and local demo data. No guarantee is made that
          prototype content is complete, clinically informed, or appropriate for every situation.
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
