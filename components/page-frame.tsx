import { ContactFooter } from "@/components/contact-footer";
import { SiteHeader } from "@/components/site-header";

export function PageFrame({
  eyebrow,
  title,
  note,
  children,
}: {
  eyebrow: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <header className="page-intro shell">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-intro__note">{note}</p>
        </header>
        {children}
      </main>
      <ContactFooter />
    </>
  );
}
