import { PageFrame } from "@/components/site/page-frame";

export default function HowItWorksPage() {
  return (
    <PageFrame
      eyebrow="How it works"
      title="Find trips by what is happening there, not just by destination."
      intro="Event Trip Matcher starts with the experience, then estimates whether the trip fits your budget, dates, and departure city."
    >
      <div className="space-y-6 text-sm leading-7 text-black/75">
        <div>
          <h2 className="text-lg font-semibold text-ink">1. Search by home city, dates, and budget</h2>
          <p className="mt-2">
            Users start with their origin city, travel window, and a rough budget. The first wedge focuses on concert
            trips.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink">2. Match against events and cost assumptions</h2>
          <p className="mt-2">
            The platform ranks event options by relevance, estimated total cost, and trip fit. For the MVP, cost
            estimates are based on structured event and city data.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink">3. Redirect to official providers</h2>
          <p className="mt-2">
            We do not process bookings directly. Users are redirected to official providers or event sources for final
            booking, pricing, and refund rules.
          </p>
        </div>
      </div>
    </PageFrame>
  );
}

