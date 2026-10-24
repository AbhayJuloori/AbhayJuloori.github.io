import type { Metadata } from "next";
import { ContactComposer } from "@/components/contact-composer";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Contact — Abhay Juloori",
  description: "Email Abhay Juloori about a role, an open-source question, or a problem in one of his repositories.",
};

export default function ContactPage() {
  return (
    <PageFrame
      eyebrow="Contact"
      title="Send a note. I read every one."
      note="Roles, open-source questions, or a problem you hit in something I built. Email is the best way to reach me."
    >
      <section className="section-block section-block--flush shell" aria-label="Contact options">
        <ContactComposer />
      </section>
    </PageFrame>
  );
}
