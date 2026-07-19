"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

export function ProjectTransitionLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (
      event.button !== 0 ||
      isModified ||
      event.currentTarget.target === "_blank" ||
      reduceMotion ||
      !document.startViewTransition
    ) {
      return;
    }

    event.preventDefault();
    const transition = document.startViewTransition(() => {
      router.push(href);
    });

    // Navigation still succeeds if the browser abandons its optional visual
    // transition (for example while a development route is compiling).
    void transition.finished.catch(() => undefined);
  }

  return (
    <Link className={className} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
