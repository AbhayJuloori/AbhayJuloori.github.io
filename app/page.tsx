import { ContactFooter } from "@/components/contact-footer";
import { ExperienceIndex } from "@/components/experience-index";
import { FieldNotes } from "@/components/field-notes";
import { GamesPanel } from "@/components/games-panel";
import { IntroHero } from "@/components/intro-hero";
import { LivingProjectGrid } from "@/components/living-project-grid";
import { SecondarySystems } from "@/components/secondary-systems";
import { SectionIndicator } from "@/components/section-indicator";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { WorkingOn } from "@/components/working-on";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <IntroHero />

        <section className="section-block shell" id="experience" aria-labelledby="experience-title">
          <SectionHeading
            id="experience-title"
            index="01"
            eyebrow="Experience"
            title="Work shaped by the decisions around the model."
            note="Three teams across research, data platforms, and risk. Public details stay deliberately narrower than the work itself."
          />
          <ExperienceIndex />
        </section>

        <section className="section-block shell" id="work" aria-labelledby="work-title">
          <SectionHeading
            id="work-title"
            index="02"
            eyebrow="Selected work"
            title="Four systems, each with something real at stake."
            note="The previews show the behavior first. The case studies trace what produced it."
          />
          <div className="work-intro" aria-hidden="true">
            <span>Living evidence / 04</span>
            <span>Select a system to enter</span>
          </div>
          <LivingProjectGrid />
        </section>

        <section className="section-block shell" id="working-on" aria-labelledby="working-title">
          <SectionHeading
            id="working-title"
            index="03"
            eyebrow="Working on"
            title="An unfinished system, shown with its open problems."
            note="What is built, what the evidence says, and where progress has stalled."
          />
          <WorkingOn />
        </section>

        <section className="section-block shell" id="other-work" aria-labelledby="secondary-title">
          <SectionHeading
            id="secondary-title"
            index="04"
            eyebrow="Other work"
            title="Earlier case studies, smaller systems, and tools built for a narrower need."
            note="Useful work does not have to pretend it is a flagship case study."
          />
          <SecondarySystems />
        </section>

        <section className="section-block shell" id="games" aria-labelledby="games-title">
          <SectionHeading
            id="games-title"
            index="05"
            eyebrow="Games"
            title="The ladder behind the bot."
            note="I play the game I am trying to teach a machine to win."
          />
          <GamesPanel />
        </section>

        <section className="section-block shell" id="notes" aria-labelledby="notes-title">
          <SectionHeading
            id="notes-title"
            index="06"
            eyebrow="Field notes"
            title="A little context that could only belong here."
            note="Current work, recurring questions, and what is happening away from the model."
          />
          <FieldNotes />
        </section>
      </main>
      <ContactFooter />
      <SectionIndicator />
    </>
  );
}
