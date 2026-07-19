import { fieldNotes } from "@/lib/field-notes";

export function FieldNotes() {
  return (
    <div className="notes-layout">
      <p className="eyebrow">Field notes</p>
      <div className="field-note-grid">
        {fieldNotes.map((note) => (
          <article className="field-note" key={note.label}>
            <span>{note.label}</span>
            <h3>{note.title}</h3>
            <p>{note.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
