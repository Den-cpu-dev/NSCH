"use client";

import { useRef, useState } from "react";
import { DestinationGrid } from "@/components/DestinationGrid";
import { HeroSection } from "@/components/HeroSection";
import { SiteFooter } from "@/components/SiteFooter";
import { ValueShowcase } from "@/components/ValueShowcase";
import { EMPTY_FILTERS, type SearchFilters } from "@/lib/types";

export function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS);
  const searchRef = useRef<HTMLDivElement>(null);

  const onExplore = () => {
    document.getElementById("destinations")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f3ef]">
      <HeroSection
        filters={filters}
        onChange={setFilters}
        onExplore={onExplore}
        searchRef={searchRef}
      />
      <ValueShowcase />
      <section id="packages" className="sr-only">
        Packages
      </section>
      <section id="stories" className="sr-only">
        Stories
      </section>
      <section id="resources" className="sr-only">
        Resources
      </section>
      <DestinationGrid filters={filters} onChange={setFilters} />
      <SiteFooter />
    </main>
  );
}
