import type { ReactNode } from "react";

type PageFrameProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function PageFrame({ eyebrow, title, intro, children }: PageFrameProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-160px)] max-w-4xl flex-col gap-8 px-6 py-10 md:px-10">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-rust">{eyebrow}</p>
        <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-base leading-8 text-black/70">{intro}</p>
      </section>
      <section className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_24px_80px_rgba(17,17,17,0.06)]">
        {children}
      </section>
    </main>
  );
}

