import { PageFrame } from "@/components/site/page-frame";

export default function AboutPage() {
  return (
    <PageFrame
      eyebrow="About"
      title="A planning layer for people who travel with purpose."
      intro="Event Trip Matcher is designed to help users discover worthwhile trips around events and experiences, starting with concerts."
    >
      <div className="space-y-5 text-sm leading-7 text-black/75">
        <p>
          Most travel tools begin with flights, hotels, or destination filters. This product begins with intent: what
          is happening, why it matters, and whether the trip makes sense for the person.
        </p>
        <p>
          The initial focus is event-led travel discovery. Longer term, the same planning engine can support broader
          experience categories such as conferences, retreats, and heritage travel.
        </p>
        <p>
          The product is currently in active development. Early versions use seeded and imported event data to test the
          matching and planning workflow before larger-scale provider coverage is added.
        </p>
      </div>
    </PageFrame>
  );
}

