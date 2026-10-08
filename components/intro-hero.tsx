import { HeroSignal } from "@/components/hero-signal";

export function IntroHero() {
  return (
    <section className="intro-hero shell" id="introduction" aria-labelledby="hero-title">
      <div className="intro-hero__copy">
        <p className="eyebrow intro-hero__eyebrow">Applied data science · Open to roles</p>
        <h1 id="hero-title">
          I’m Abhay.
          <span>I build analytical systems that turn uncertain data into decisions.</span>
        </h1>
        <p className="intro-hero__summary">
          My work moves from the shape of the data to the model, the interface, and the moment someone has to decide what happens next.
        </p>
        <div className="hero-actions">
          <a className="text-action" href="#work">View selected work <span aria-hidden="true">↘</span></a>
          <a className="text-action text-action--quiet" href="#about">About my work <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <HeroSignal />
    </section>
  );
}
