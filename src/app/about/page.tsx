import { PageFrame } from "@/components/site/page-frame";

export default function AboutPage() {
  return (
    <PageFrame
      eyebrow="About"
      title="A small app for keeping the relationship visible."
      intro="Us, On Purpose is designed to make the maintenance and growth of a relationship easier to revisit together."
    >
      <div className="space-y-5 text-sm leading-7 text-black/75">
        <p>
          Most couples do not need a complicated system. They need one place to check in, name tension without making
          it worse, talk about intimacy safely, and keep future plans from getting buried under logistics.
        </p>
        <p>
          This prototype takes the strongest parts of a relationship worksheet or shared Google Sheet and gives them a
          clearer structure: weekly ritual, repair queue, intimacy menu, date bank, discovery prompts, and shared
          goals.
        </p>
        <p>
          The current build is local-first and uses mock data to shape the experience. If it proves useful, the next
          step would be real persistence, private accounts, and separate views for each partner.
        </p>
      </div>
    </PageFrame>
  );
}
