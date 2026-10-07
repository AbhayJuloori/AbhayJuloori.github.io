"use client";

import { useEffect, useState } from "react";

const sections = [
  ["introduction", "Introduction"],
  ["experience", "Experience"],
  ["work", "Selected work"],
  ["working-on", "Working on"],
  ["other-work", "Other work"],
  ["games", "Games"],
  ["notes", "Field notes"],
  ["about", "Contact"],
] as const;

export function SectionIndicator() {
  const [active, setActive] = useState("Introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const match = sections.find(([id]) => id === visible?.target.id);
        if (match) setActive(match[1]);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    const elements = sections
      .map(([id]) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div className="section-indicator" aria-hidden="true">{active}</div>;
}
