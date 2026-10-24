"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "@/lib/projects";
import { siteNav } from "@/lib/site-nav";

function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function sectionFor(pathname: string) {
  const slug = pathname.match(/^\/work\/([^/]+)/)?.[1];
  if (!slug) return pathname;
  return projects.find((project) => project.slug === slug)?.tier === "other" ? "/projects" : "/";
}

export function SiteNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = sectionFor(normalize(usePathname() ?? "/"));

  return (
    <>
      {siteNav.map((item) => {
        const href = normalize(item.href);
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={onNavigate}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
