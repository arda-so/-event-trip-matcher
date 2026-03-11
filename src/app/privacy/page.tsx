import { PageFrame } from "@/components/site/page-frame";
import { siteConfig } from "@/lib/site-config";

export default function PrivacyPage() {
  return (
    <PageFrame
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This page is a starting policy draft for the product. It should be reviewed and updated with real legal and operational details before public launch."
    >
      <div className="space-y-5 text-sm leading-7 text-black/75">
        <p>
          {siteConfig.legalName} may collect basic usage information, search inputs, and optional contact details
          submitted by users. This information is used to operate the product, improve trip matching, and communicate
          with users.
        </p>
        <p>
          We do not complete bookings on behalf of users. When users click through to external partners, those partners
          apply their own privacy and cookie policies.
        </p>
        <p>
          Contact for privacy enquiries: <span className="font-medium text-ink">{siteConfig.contactEmail}</span>
        </p>
        <p>
          Before production launch, this page should be updated with the real controller identity, retention periods,
          analytics vendors, cookie disclosures, and applicable data-protection details for {siteConfig.jurisdiction}.
        </p>
        <p className="rounded-2xl border border-rust/20 bg-rust/5 px-4 py-3 text-rust">{siteConfig.statusNote}</p>
      </div>
    </PageFrame>
  );
}
