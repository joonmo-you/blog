"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LangToggle } from "./lang-toggle";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={`container-fluid flex min-h-[3.5rem] items-center gap-x-6 py-2 ${electrolize.className}`}>
        {/* Logo */}
        <Link href="/" className="text-fluid-base font-bold tracking-tight">
          joonmo.you
        </Link>

        {/* Desktop nav — hidden below 450px */}
        <nav className="hidden min-[450px]:flex flex-1 flex-wrap items-center gap-[var(--sp-2)] text-fluid-sm">
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

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />
          {/* Hamburger — visible below 450px, placed after ThemeToggle */}
          <Button
            variant="ghost"
            size="icon"
            className="min-[450px]:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav drawer — slides in below 450px */}
      {open && (
        <nav className="min-[450px]:hidden border-t bg-background/95 backdrop-blur">
          <div className={`container-fluid flex flex-col py-3 gap-1 text-fluid-sm ${electrolize.className}`}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-2 transition-colors hover:text-foreground/80",
                  pathname.startsWith(href) ? "text-foreground font-medium" : "text-foreground/60",
                )}>
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
