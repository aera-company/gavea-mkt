import { Hero } from "@/components/hero/Hero";
import { heroCopy } from "@/lib/hero";

/**
 * Redirection V2 · PASS R1: ACT 01 only (the hero gate).
 * The V1 moments stay in the repo history; R2 onwards rebuilds the page.
 */
export default function Page() {
  return (
    <main id="main">
      <Hero />
      <footer className="hero-after t-label">
        <span>{heroCopy.next}</span>
        <span>{heroCopy.nextNote}</span>
      </footer>
    </main>
  );
}
