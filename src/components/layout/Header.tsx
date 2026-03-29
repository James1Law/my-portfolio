"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-border bg-bg-primary/80 px-6 backdrop-blur-xl md:px-12">
      {/* Logo */}
      <a href="#hero" className="text-xl font-bold tracking-tight text-text-primary">
        J<span className="text-accent">L</span>
      </a>

      {/* Desktop nav */}
      <nav className="hidden gap-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-transparent text-text-secondary md:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          data-testid="mobile-nav"
          className={cn(
            "absolute top-16 left-0 right-0 flex flex-col border-b border-border bg-bg-primary/95 px-6 py-4 backdrop-blur-xl md:hidden"
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-base font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
