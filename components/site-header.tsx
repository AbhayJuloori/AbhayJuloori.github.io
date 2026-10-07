import Link from "next/link";
import { MobileMenu } from "@/components/mobile-menu";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/" aria-label="Abhay Juloori, home">
        <strong>Abhay Juloori</strong>
        <span>Applied data scientist</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#about">About</Link>
      </nav>
      <a
        className="resume-link"
        href="mailto:juloori.abhay@gmail.com?subject=Resume%20request"
      >
        Request résumé ↗
      </a>
      <MobileMenu />
    </header>
  );
}
