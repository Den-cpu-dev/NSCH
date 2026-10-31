"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Plane } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
  const [index, setIndex] = useState(0);
  const places = SHOWCASE.map((_, i) => SHOWCASE[(i + index) % SHOWCASE.length]);

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:pt-20">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3 text-sm text-neutral-600">
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

        <h2 className="font-display mt-6 max-w-xl text-center text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 md:text-6xl">
          {BRAND.shortName ?? BRAND.name} means
          <br />
          Going Places
        </h2>
        <CompassMark />
      </div>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            • 01 Our Value
          </p>
          <h3 className="font-display mt-4 max-w-xs text-3xl font-semibold leading-tight md:text-4xl">
            Not Your Boring Travel Agent
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
            We plan chill, curated trips with good vibes and better people —
            retreats, cliff walks, and boutique stays designed to feel like an
            editorial, not a checklist.
          </p>
          <Button className="mt-8" asChild>
            <a href="#contact">Book a Seat</a>
          </Button>
        </div>

        <div>
          <div className="flex items-end gap-4 overflow-x-auto pb-4 md:overflow-visible">
            <AnimatePresence mode="popLayout">
              {places.map((place, i) => (
                <motion.article
                  key={`${place.id}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className={`${place.sizeClass} ${place.offsetClass} relative shrink-0 overflow-hidden rounded-3xl`}
                >
                  <Image
                    src={place.image}
                    alt={place.title || "NSCH Showcase"}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-neutral-500">
            <button
              type="button"
              onClick={() =>
                setIndex((v) => (v - 1 + SHOWCASE.length) % SHOWCASE.length)
              }
              className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 hover:bg-white"
            >
              <ChevronLeft className="h-3 w-3" /> Prev
            </button>
            <button
              type="button"
              onClick={() => setIndex((v) => (v + 1) % SHOWCASE.length)}
              className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 hover:bg-white"
            >
              Next <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
