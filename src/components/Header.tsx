"use client";

import Image from "next/image";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearchFocus?: () => void;
}

export function Header({ onSearchFocus }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="group flex items-center gap-3 transition-opacity hover:opacity-95"
            aria-label={BRAND.name}
          >
            <div className="flex items-center rounded-xl bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur transition-transform group-hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt={BRAND.name}
                width={140}
                height={46}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
          </a>
          <button
            type="button"
            onClick={onSearchFocus}
            className="hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md md:inline-flex"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </button>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-full border border-white/30 p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div
        className={cn(
          "mx-4 overflow-hidden rounded-2xl border border-white/15 bg-black/50 backdrop-blur-xl lg:hidden",
          open ? "mb-4 max-h-96 p-4" : "max-h-0 border-0 p-0",
        )}
      >
        <div className="flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
