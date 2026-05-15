import { PageFrame } from "@/components/site/page-frame";

export default function HowItWorksPage() {
  return (
    <PageFrame
      eyebrow="How it works"
      title="Use the app like a weekly ritual, not a surveillance tool."
      intro="The goal is to create calmer, more useful conversations. The app should help you connect, not make either person feel managed."
    >
      <div className="space-y-6 text-sm leading-7 text-black/75">
        <div>
          <h2 className="text-lg font-semibold text-ink">1. Start with one weekly check-in</h2>
          <p className="mt-2">
            Use the weekly check-in to cover appreciation, disconnection, and practical support. If the rest of the app
            gets ignored, that is still a meaningful win.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink">2. Keep hard topics out of the heat of the moment</h2>
          <p className="mt-2">
            The repair queue and intimacy menu create a safer place for conversations that often go badly when they are
            improvised under stress.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink">3. Balance repair with discovery and play</h2>
          <p className="mt-2">
            Date ideas, discovery prompts, and shared goals stop the relationship from turning into a permanent problem
            list. The app should help you enjoy each other too.
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
