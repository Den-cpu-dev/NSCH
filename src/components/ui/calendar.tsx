"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  start?: Date;
  end?: Date;
  onSelect: (start?: Date, end?: Date) => void;
}

export function Calendar({ start, end, onSelect }: CalendarProps) {
  const [cursor, setCursor] = useState(start ?? new Date());

  const monthStart = startOfMonth(cursor);
  const days = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 }),
  });

  const handleDay = (day: Date) => {
    if (!start || (start && end)) {
      onSelect(day, undefined);
      return;
    }
    if (day < start) {
      onSelect(day, start);
      return;
    }
    onSelect(start, day);
  };

  return (
    <div className="w-[280px] p-2">
      <div className="mb-3 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setCursor(subMonths(cursor, 1))}
          className="rounded-full p-1 hover:bg-neutral-100"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-semibold">{format(cursor, "MMMM yyyy")}</p>
        <button
          type="button"
          onClick={() => setCursor(addMonths(cursor, 1))}
          className="rounded-full p-1 hover:bg-neutral-100"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-neutral-400">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inRange =
            start &&
            end &&
            isWithinInterval(day, { start, end });
          const selected =
            (start && isSameDay(day, start)) || (end && isSameDay(day, end));
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => handleDay(day)}
              className={cn(
                "h-8 rounded-full text-xs transition-colors",
                !isSameMonth(day, cursor) && "text-neutral-300",
                inRange && "bg-neutral-100",
                selected && "bg-neutral-950 text-white",
                !selected && "hover:bg-neutral-100",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
