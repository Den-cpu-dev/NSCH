"use client";

import { AnimatePresence } from "framer-motion";
import { ChevronDown, Compass, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CATEGORIES,
  DATE_BANDS,
  DESTINATIONS,
  LOCATIONS,
} from "@/lib/data";
import type { SearchFilters } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DestinationGridProps {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
}

function FilterSelect({
  label,
  hint,
  value,
  options,
  onPick,
}: {
  label: string;
  hint: string;
  value: string;
  options: readonly string[];
  onPick: (v: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center justify-between gap-2 px-4 py-3 text-left"
        >
          <span>
            <span className="block text-[13px] font-medium text-neutral-900">
              {label}
            </span>
            <span className="block truncate text-[11px] text-neutral-400">
              {value || hint}
            </span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <button
          type="button"
          onClick={() => onPick("")}
          className={cn(
            "w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-neutral-100",
            !value && "bg-neutral-950 text-white hover:bg-neutral-900",
          )}
        >
          Any
        </button>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onPick(option)}
            className={cn(
              "w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-neutral-100",
              value === option &&
                "bg-neutral-950 text-white hover:bg-neutral-900",
            )}
          >
            {option}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function matchesActivity(kind: string, activity: string) {
  if (!activity) return true;
  if (activity === kind) return true;
  if (activity === "Boutique Stays") return kind === "Private" || kind === "Retreat";
  if (activity === "Active Adventures") return kind === "Adventure" || kind === "Open Trip";
  if (activity === "Retreats") return kind === "Retreat";
  if (activity === "Cultural Walks") return true;
  return kind.toLowerCase().includes(activity.toLowerCase());
}

export function DestinationGrid({ filters, onChange }: DestinationGridProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const results = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const byHeroLocation =
        !filters.location ||
        item.location === filters.location ||
        item.region.includes(filters.location) ||
        item.location.includes(filters.location.split(",")[0]);
      const byQuery =
        !filters.destinationQuery ||
        item.name.toLowerCase().includes(filters.destinationQuery.toLowerCase()) ||
        item.location
          .toLowerCase()
          .includes(filters.destinationQuery.toLowerCase());
      const byCategory =
        !filters.category || item.category === filters.category;
      const byKind = matchesActivity(item.kind, filters.activity);
      const byDate = !filters.dateBand || true;
      return byHeroLocation && byQuery && byCategory && byKind && byDate;
    });
  }, [filters]);

  const strip = (
    <div className="flex flex-1 divide-x divide-neutral-100">
      <FilterSelect
        label="Destination"
        hint="Find a spot"
        value={filters.destinationQuery}
        options={LOCATIONS}
        onPick={(destinationQuery) => onChange({ ...filters, destinationQuery })}
      />
      <FilterSelect
        label="Category"
        hint="Select type"
        value={filters.category}
        options={CATEGORIES}
        onPick={(category) => onChange({ ...filters, category })}
      />
      <FilterSelect
        label="Date"
        hint="Select date range"
        value={filters.dateBand}
        options={DATE_BANDS}
        onPick={(dateBand) => onChange({ ...filters, dateBand })}
      />
    </div>
  );

  return (
    <section
      id="destinations"
      className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-24 pt-6 md:pt-4"
    >
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
        • Popular Destination 2026
      </p>
      <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Pick the Place
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-neutral-500 md:text-right">
          We have great options for everyone and cozy spots for your squad to
          enjoy together.
        </p>
      </div>

      <div className="mt-8">
        <div className="hidden items-stretch overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_20px_50px_-28px_rgba(0,0,0,0.35)] md:flex">
          {strip}
          <Button className="h-auto min-w-[120px] rounded-none rounded-r-2xl">
            Discover
          </Button>
        </div>
        <div className="md:hidden">
          <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm"
              >
                <span className="inline-flex items-center gap-2 text-sm">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </span>
                <span className="rounded-full bg-neutral-950 px-4 py-2 text-xs text-white">
                  Discover
                </span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter destinations</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <label className="block text-sm">
                  Destination
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2"
                    value={filters.destinationQuery}
                    onChange={(e) =>
                      onChange({
                        ...filters,
                        destinationQuery: e.target.value,
                      })
                    }
                  >
                    <option value="">Find a spot</option>
                    {LOCATIONS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  Category
                  <select
                    className="mt-1 w-full rounded-xl border px-3 py-2"
                    value={filters.category}
                    onChange={(e) =>
                      onChange({ ...filters, category: e.target.value })
                    }
                  >
                    <option value="">Select type</option>
                    {CATEGORIES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <Button className="w-full" onClick={() => setSheetOpen(false)}>
                  Discover
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {results.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center text-neutral-500">
          <Compass className="mb-3 h-8 w-8" />
          <p>No journeys match those filters yet.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() =>
              onChange({
                ...filters,
                activity: "",
                location: "",
                budget: "",
                destinationQuery: "",
                category: "",
                priceBand: "",
                dateBand: "",
              })
            }
          >
            Reset filters
          </Button>
        </div>
      )}
    </section>
  );
}
