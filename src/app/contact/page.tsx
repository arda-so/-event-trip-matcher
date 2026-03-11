import { PageFrame } from "@/components/site/page-frame";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  return (
    <PageFrame
      eyebrow="Contact"
      title="Get in touch"
      intro="For partnership, product, or support enquiries, use the contact details below."
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
          Business site and product URLs should be updated here before submitting partner applications.
        </p>
        <p>
          If you plan to apply for affiliate or event API access, use a real business email and a live public site
          rather than placeholder details.
        </p>
      </div>
    </PageFrame>
  );
}
