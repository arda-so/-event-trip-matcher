import { PageFrame } from "@/components/site/page-frame";
import { siteConfig } from "@/lib/site-config";

export default function PrivacyPage() {
  return (
    <PageFrame
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This is a starter draft for a relationship app. It is not a final legal policy."
    >
      <div className="space-y-5 text-sm leading-7 text-black/75">
        <p>
          {siteConfig.legalName} may collect relationship check-ins, notes, preferences, goals, and optional contact
          details submitted by users. This information would be used to operate the product and improve the experience.
        </p>
        <p>
          Because the subject matter is highly sensitive, any production version of this app should minimize data
          collection, secure stored entries, and make export or deletion straightforward.
        </p>
        <p>
          Contact for privacy enquiries: <span className="font-medium text-ink">{siteConfig.contactEmail}</span>
        </p>
        <p>
          Before production launch, this page should be updated with the real controller identity, retention periods,
          security practices, analytics vendors, and applicable data-protection details for {siteConfig.jurisdiction}.
        </p>
        <p className="rounded-2xl border border-rust/20 bg-rust/5 px-4 py-3 text-rust">{siteConfig.statusNote}</p>
      </div>
    </PageFrame>
  );
}
