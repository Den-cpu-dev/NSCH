"use client";

import { format } from "date-fns";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
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
import { ACTIVITIES, LOCATIONS } from "@/lib/data";
import type { SearchFilters } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HeroFilterBarProps {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
  onExplore: () => void;
}

function OptionList({
  options,
  value,
  onPick,
}: {
  options: readonly string[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onPick(option)}
          className={cn(
            "rounded-xl px-3 py-2 text-left text-sm hover:bg-neutral-100",
            value === option && "bg-neutral-950 text-white hover:bg-neutral-900",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
}: {
  label: string;
  value?: string;
  placeholder: string;
}) {
  return (
    <div className="min-w-0 text-left">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </p>
      <p className="mt-1 truncate text-sm text-white">
        {value || placeholder}
      </p>
    </div>
  );
}

export function HeroFilterBar({
  filters,
  onChange,
  onExplore,
}: HeroFilterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const dateValue =
    filters.dateStart && filters.dateEnd
      ? `${format(filters.dateStart, "d MMM")} – ${format(filters.dateEnd, "d MMM")}`
      : filters.dateStart
        ? format(filters.dateStart, "d MMM yyyy")
        : "";

  const fields = (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex flex-1 items-center justify-between gap-2 px-5 py-4 text-left"
          >
            <Field
              label="Activity/Kind"
              value={filters.activity}
              placeholder="Open Trip / Private"
            />
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/50" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <OptionList
            options={ACTIVITIES}
            value={filters.activity}
            onPick={(activity) => onChange({ ...filters, activity })}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex flex-1 items-center justify-between gap-2 border-white/10 px-5 py-4 text-left md:border-l"
          >
            <Field
              label="Location"
              value={filters.location}
              placeholder="Indonesia"
            />
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/50" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <OptionList
            options={LOCATIONS}
            value={filters.location}
            onPick={(location) => onChange({ ...filters, location })}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex flex-1 items-center justify-between gap-2 border-white/10 px-5 py-4 text-left md:border-l"
          >
            <Field
              label="Date/Duration"
              value={dateValue}
              placeholder="Anytime · 3 days"
            />
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <Calendar
            start={filters.dateStart}
            end={filters.dateEnd}
            onSelect={(dateStart, dateEnd) =>
              onChange({ ...filters, dateStart, dateEnd })
            }
          />
        </PopoverContent>
      </Popover>


    </>
  );

  return (
    <>
      <div className="relative z-20 mx-4 -mt-8 md:hidden">
        <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white shadow-2xl backdrop-blur-md"
            >
              <span className="flex items-center gap-2 text-sm">
                <SlidersHorizontal className="h-4 w-4" />
                Refine your trip
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950">
                Explore
              </span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Find a journey</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-neutral-900">
              <label className="block text-sm">
                Activity
                <select
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2"
                  value={filters.activity}
                  onChange={(e) =>
                    onChange({ ...filters, activity: e.target.value })
                  }
                >
                  <option value="">Any kind</option>
                  {ACTIVITIES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Location
                <select
                  className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2"
                  value={filters.location}
                  onChange={(e) =>
                    onChange({ ...filters, location: e.target.value })
                  }
                >
                  <option value="">Anywhere</option>
                  {LOCATIONS.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <div className="rounded-2xl border border-neutral-200">
                <Calendar
                  start={filters.dateStart}
                  end={filters.dateEnd}
                  onSelect={(dateStart, dateEnd) =>
                    onChange({ ...filters, dateStart, dateEnd })
                  }
                />
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  setSheetOpen(false);
                  onExplore();
                }}
              >
                Explore
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative z-20 mx-auto hidden w-[min(1120px,calc(100%-3rem))] -translate-y-1/2 md:block">
        <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md">
          <div className="grid flex-1 grid-cols-4">{fields}</div>
          <Button
            variant="light"
            onClick={onExplore}
            className="h-auto min-w-[140px] rounded-none rounded-r-2xl px-10 text-base font-semibold"
          >
            Explore
          </Button>
        </div>
      </div>
    </>
  );
}
