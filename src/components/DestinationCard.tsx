"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import Image from "next/image";
import type { Destination } from "@/lib/types";

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export function DestinationCard({ destination, index }: DestinationCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="rounded-[28px] bg-transparent"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        {destination.name ? (
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-neutral-950">
              {destination.name}
            </h3>
            {destination.region && (
              <p className="text-xs text-neutral-500">{destination.region}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              {destination.category}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1 text-[11px] text-neutral-500">
          {Array.from({ length: destination.aircraftCount ?? 1 }).map((_, i) => (
            <span
              key={i}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100"
            >
              <Plane className="h-3 w-3" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative aspect-[4/3.2] overflow-hidden rounded-[24px]">
        <Image
          src={destination.image}
          alt={destination.name ? `${destination.name} in ${destination.region}` : "NSCH Travel"}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-neutral-800 backdrop-blur">
          {destination.kind}
        </span>
        <div className="absolute inset-x-3 bottom-3">
          <div className="flex items-center justify-between rounded-full bg-black/45 px-3.5 py-2 text-[11px] text-white backdrop-blur-md">
            <span className="font-medium tracking-wide">{destination.category}</span>
            <span>{destination.dates}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-neutral-500">
        <div>
          <p className="uppercase tracking-wide text-neutral-400">
            Accommodation
          </p>
          <p className="mt-0.5 text-neutral-700">{destination.amenities.stay}</p>
        </div>
        <div>
          <p className="uppercase tracking-wide text-neutral-400">Transport</p>
          <p className="mt-0.5 text-neutral-700">
            {destination.amenities.transport}
          </p>
        </div>
        <div>
          <p className="uppercase tracking-wide text-neutral-400">Meals</p>
          <p className="mt-0.5 text-neutral-700">
            {destination.amenities.meals}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
