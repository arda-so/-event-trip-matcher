import Link from "next/link";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-black/8 bg-white/55 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          Us, On Purpose
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-black/65">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
