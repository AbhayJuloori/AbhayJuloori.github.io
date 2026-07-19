import Link from "next/link";

const sections = [
  ["01", "The decision", "decision"],
  ["02", "System design", "system"],
  ["03", "Evaluation", "evaluation"],
  ["04", "Interface", "interface"],
  ["05", "Reflection", "reflection"],
] as const;

export function CaseStudyNav() {
  return (
    <aside className="case-rail" aria-label="Case study sections">
      <p>CASE TRACE / 01</p>
      <nav>
        {sections.map(([number, label, id]) => <a key={id} href={`#${id}`}><span>{number}</span>{label}</a>)}
      </nav>
      <Link className="case-rail__back" href="/#work">← All systems</Link>
    </aside>
  );
}
