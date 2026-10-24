import type { Metadata } from "next";
import { FieldNotes } from "@/components/field-notes";
import { GamesPanel } from "@/components/games-panel";
import { PageFrame } from "@/components/page-frame";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Notes — Abhay Juloori",
  description: "Field notes and the game behind the Catan bot.",
};

export default function NotesPage() {
  return (
    <PageFrame
      eyebrow="Notes"
      title="A little context that could only belong here."
      note="Current work, recurring questions, and what is happening away from the model."
    >
      <section className="section-block shell" id="notes" aria-labelledby="notes-title">
        <SectionHeading
          id="notes-title"
          index="01"
          eyebrow="Field notes"
          title="Questions that keep coming back."
          note="Short notes on current work and what sits around it."
        />
        <FieldNotes />
      </section>

      <section className="section-block shell" id="games" aria-labelledby="games-title">
        <SectionHeading
          id="games-title"
          index="02"
          eyebrow="Games"
          title="The ladder behind the bot."
          note="I play the game I am trying to teach a machine to win."
        />
        <GamesPanel />
      </section>
    </PageFrame>
  );
}
