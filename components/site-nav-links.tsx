"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteNav } from "@/lib/site-nav";

function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function SiteNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = normalize(usePathname() ?? "/");

  return (
    <>
      {siteNav.map((item) => {
        const href = normalize(item.href);
        const active = href === "/" ? pathname === "/" || pathname.startsWith("/work") : pathname.startsWith(href);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={onNavigate}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
