"use client";

import { useState } from "react";
import { contactEmail } from "@/lib/site-nav";

const topics = ["A role or project", "An open-source question", "A problem in one of my repositories", "Something else"];

export function ContactComposer() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `${topic}${name.trim() ? ` from ${name.trim()}` : ""}`;
    const body = `${message.trim()}${name.trim() ? `\n\n${name.trim()}` : ""}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="contact-layout">
      <div className="contact-direct">
        <p className="eyebrow">Email</p>
        <a className="contact-direct__email" href={`mailto:${contactEmail}`}>
          {contactEmail} <span aria-hidden="true">↗</span>
        </a>
        <button className="contact-direct__copy" type="button" onClick={copyEmail}>
          {copied ? "Copied" : "Copy address"}
        </button>
        <p aria-live="polite" className="visually-hidden">{copied ? "Email address copied" : ""}</p>
        <ul className="contact-direct__links">
          <li><a href={`mailto:${contactEmail}?subject=Resume%20request`}>Request my résumé ↗</a></li>
          <li><a href="https://github.com/AbhayJuloori" target="_blank" rel="noreferrer">GitHub ↗</a></li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={send}>
        <p className="eyebrow">Write a message</p>
        <label>
          <span>Your name</span>
          <input type="text" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          <span>About</span>
          <select name="topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
            {topics.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Message</span>
          <textarea
            name="message"
            rows={7}
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="What are you working on, and where are you stuck?"
          />
        </label>
        <button className="contact-form__send" type="submit">Open in my email app <span aria-hidden="true">↗</span></button>
        <p className="contact-form__note">This drafts an email in your own mail app. Nothing is stored on this site.</p>
      </form>
    </div>
  );
}
