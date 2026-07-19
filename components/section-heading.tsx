export function SectionHeading({
  index,
  eyebrow,
  title,
  note,
  id,
}: {
  index: string;
  eyebrow: string;
  title: string;
  note: string;
  id: string;
}) {
  return (
    <header className="section-heading">
      <span className="section-heading__index">{index}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <p className="section-heading__note">{note}</p>
    </header>
  );
}
