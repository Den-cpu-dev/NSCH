"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { Header } from "@/components/Header";
import { HeroFilterBar } from "@/components/HeroFilterBar";
import { HERO_IMAGE } from "@/lib/data";
import type { SearchFilters } from "@/lib/types";

interface HeroSectionProps {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
  onExplore: () => void;
  searchRef: RefObject<HTMLDivElement | null>;
}

export function HeroSection({
  filters,
  onChange,
  onExplore,
  searchRef,
}: HeroSectionProps) {
  return (
    <section id="top" className="relative px-3 pt-3 md:px-5 md:pt-4">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px]">
        <div className="relative h-[82vh] min-h-[540px] md:h-[85vh] md:min-h-[600px] w-full">
          <Image
            src={HERO_IMAGE}
            alt="Golden steppe with yurts beneath snow-capped mountains"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
          <Header
            onSearchFocus={() =>
              searchRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
            <h1 className="font-display text-7xl font-extrabold leading-none tracking-tight text-[#D4AF37] sm:text-8xl md:text-9xl lg:text-[11rem] drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]">
              Travel
            </h1>
            <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-base md:text-xl font-medium leading-relaxed text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              Travel with intention: Discover retreats, active adventures, and
              boutique stays all in one place.
            </p>
          </div>
        </div>
      </div>
      <div ref={searchRef} className="relative z-30">
        <HeroFilterBar
          filters={filters}
          onChange={onChange}
          onExplore={onExplore}
        />
      </div>
    </section>
  );
}
