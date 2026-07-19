"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function closeMenu() {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="mobile-menu-trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Menu
      </button>
      <dialog
        ref={dialogRef}
        className="mobile-menu-dialog"
        aria-label="Site navigation"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-dialog__top">
          <span>Navigate</span>
          <button type="button" onClick={closeMenu}>Close</button>
        </div>
        <nav aria-label="Mobile navigation">
          <Link href="/#work" onClick={closeMenu}>Work</Link>
          <Link href="/#experience" onClick={closeMenu}>Experience</Link>
          <Link href="/#about" onClick={closeMenu}>About</Link>
        </nav>
        <a
          className="mobile-menu-dialog__resume"
          href="mailto:juloori.abhay@gmail.com?subject=Resume%20request"
          onClick={closeMenu}
        >
          Request résumé ↗
        </a>
      </dialog>
    </>
  );
}
