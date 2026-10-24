import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";
import { SiteNavLinks } from "@/components/site-nav-links";
import { contactEmail } from "@/lib/site-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="Abhay Juloori, home">
        <strong>Abhay Juloori</strong>
        <span>Applied data scientist</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <SiteNavLinks />
      </nav>
      <a
        className="resume-link"
        href={`mailto:${contactEmail}?subject=Resume%20request`}
      >
        Request résumé ↗
      </a>
      <MobileMenu />
    </header>
  );
}
