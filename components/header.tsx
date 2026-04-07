"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LangToggle } from "./lang-toggle";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { electrolize } from "@/app/fonts";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={`container mx-auto flex h-14 max-w-4xl items-center px-4 ${electrolize.className}`}>
        <Link href="/" className="mr-6 font-bold tracking-tight">
          joonmo.you
        </Link>
        <nav className="flex flex-1 items-center gap-4 text-sm">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname.startsWith(href) ? "text-foreground font-medium" : "text-foreground/60",
              )}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
