import { PageFrame } from "@/components/site/page-frame";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  return (
    <PageFrame
      eyebrow="Contact"
      title="Prototype contact details"
      intro="This page exists so the app remains structurally complete, but the current details are placeholders."
    >
      <div className="space-y-4 text-sm leading-7 text-black/75">
        <p>
          General enquiries: <span className="font-medium text-ink">{siteConfig.contactEmail}</span>
        </p>
        <p>
          Support: <span className="font-medium text-ink">{siteConfig.supportEmail}</span>
        </p>
        <p>
          Public site: <span className="font-medium text-ink">{siteConfig.domain}</span>
        </p>
        <p>
          Application URL: <span className="font-medium text-ink">{siteConfig.appUrl}</span>
        </p>
        <p className="rounded-2xl border border-rust/20 bg-rust/5 px-4 py-3 text-rust">{siteConfig.statusNote}</p>
        <p>
          Before sharing this app outside your own devices, replace the email address, domain, and legal information
          with real details.
        </p>
      </div>
    </PageFrame>
  );
}
