"use client";

import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BRAND, REVIEWERS, SHOWCASE } from "@/lib/data";

function CompassMark() {
  return (
    <div className="mx-auto mt-6 flex w-48 items-center justify-center gap-2 text-sky-600">
      <span className="h-px flex-1 border-t border-dotted border-sky-400/70" />
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden
      >
        <circle cx="12" cy="12" r="3" className="fill-sky-600" />
        <path d="M12 2l1.2 8.2L12 12l-1.2-1.8L12 2z" />
        <path d="M12 22l-1.2-8.2L12 12l1.2 1.8L12 22z" />
      </svg>
      <span className="h-px flex-1 border-t border-dotted border-sky-400/70" />
    </div>
  );
}

export function ValueShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -250 : 250;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const itemWidth = 230;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), SHOWCASE.length - 1));
  };

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 pb-8 pt-14 md:pt-20">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-600">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 fill-sky-600 text-sky-600" />
            We are NSCH
          </span>
          <span className="text-neutral-300">•</span>
          <span className="inline-flex items-center gap-2">
            <span className="flex -space-x-2">
              {REVIEWERS.map((person) => (
                <Image
                  key={person.id}
                  src={person.avatar}
                  alt={person.name}
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] rounded-md object-cover ring-2 ring-white"
                />
              ))}
            </span>
            5K+ People Satisfied
          </span>
        </div>

        <h2 className="font-display mt-6 max-w-xl text-center text-3xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl md:text-6xl">
          {BRAND.shortName ?? BRAND.name} means
          <br />
          Going Places
        </h2>
        <CompassMark />
      </div>

      <div className="mt-12 sm:mt-14 grid items-center gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            • 01 Our Value
          </p>
          <h3 className="font-display mt-4 max-w-xs text-2xl sm:text-3xl font-semibold leading-tight md:text-4xl">
            Not Your Boring Travel Agent
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
            We plan chill, curated trips with good vibes and better people —
            retreats, cliff walks, and boutique stays designed to feel like an
            editorial, not a checklist.
          </p>
          <Button className="mt-6 sm:mt-8 w-full sm:w-auto" asChild>
            <a href="#contact">Book a Seat</a>
          </Button>
        </div>

        <div className="min-w-0 w-full overflow-hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="-mx-4 sm:mx-0 px-4 sm:px-0 flex items-center gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {SHOWCASE.map((place) => (
              <article
                key={place.id}
                className={`shrink-0 snap-start overflow-hidden rounded-3xl relative transition-transform duration-300 hover:scale-[1.02] shadow-sm ${place.sizeClass} ${place.offsetClass} w-[210px] sm:w-[230px] md:w-[240px]`}
              >
                <Image
                  src={place.image}
                  alt={place.title || "NSCH Showcase"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 240px, 280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </article>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between sm:justify-end gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-1.5 sm:hidden">
              {SHOWCASE.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-5 bg-neutral-900" : "w-1.5 bg-neutral-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous slide"
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3.5 py-2 sm:py-1.5 text-xs font-medium hover:bg-neutral-50 active:scale-95 transition-all"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next slide"
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3.5 py-2 sm:py-1.5 text-xs font-medium hover:bg-neutral-50 active:scale-95 transition-all"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
