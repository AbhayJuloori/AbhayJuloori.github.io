import Link from "next/link";

export function ContactFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={compact ? "contact-footer contact-footer--compact" : "contact-footer"} id="contact">
      <div className="shell">
        {compact ? null : <div className="contact-footer__main">
          <p className="eyebrow">Open channel</p>
          <div>
            <h2>Let’s talk about a difficult decision hiding inside a data problem.</h2>
            <a className="contact-footer__email" href="mailto:juloori.abhay@gmail.com">
              juloori.abhay@gmail.com <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>}
        <div className="contact-footer__base">
          <span>Abhay Juloori © 2026</span>
          <Link href="/open-source/">Open source</Link>
          <a href="https://github.com/AbhayJuloori" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
