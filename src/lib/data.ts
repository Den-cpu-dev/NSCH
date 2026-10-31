import type { Destination, Reviewer, ShowcasePlace } from "./types";

export const BRAND = {
  name: "NSCH Enterprise Inc.",
  shortName: "NSCH",
  tagline: "Going Places",
};

export const NAV_LINKS = [
  { href: "#destinations", label: "Destinations" },
  { href: "#packages", label: "Packages" },
  { href: "#stories", label: "Stories" },
  { href: "#resources", label: "Resources" },
  { href: "#contact", label: "Contact us" },
  { href: "#about", label: "About us" },
] as const;

export const ACTIVITIES = [
  "Open Trip",
  "Private",
  "Retreats",
  "Active Adventures",
  "Boutique Stays",
  "Cultural Walks",
] as const;

export const LOCATIONS = [
  "Bali, Indonesia",
  "Uluwatu, Bali",
  "Bangli, East Bali",
  "Toba Lake, Sumatra",
  "Altai, Mongolia",
  "Kyoto, Japan",
  "Patagonia, Chile",
] as const;

export const BUDGETS = [
  "Under $500",
  "$500 – $1,200",
  "$1,200 – $2,500",
  "$2,500+",
] as const;

export const CATEGORIES = [
  "Surf",
  "Hiking",
  "Culture",
  "Stay",
  "Wellness",
  "Wildlife",
] as const;

export const PRICE_BANDS = ["Under $400", "$400 – $700", "$700+"] as const;

export const DATE_BANDS = ["This month", "Next 60 days", "Q1 2026"] as const;

export const REVIEWERS: Reviewer[] = [
  {
    id: "r1",
    name: "Amelia",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "r2",
    name: "Kenji",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: "r3",
    name: "Sofia",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  },
];

export const SHOWCASE: ShowcasePlace[] = [
  {
    id: "s1",
    title: "",
    location: "",
    caption: "",
    image: "/images/photo-1.jpg",
    offsetClass: "md:translate-y-6",
    sizeClass: "h-[280px] md:h-[340px] w-[200px] md:w-[230px]",
  },
  {
    id: "s2",
    title: "",
    location: "",
    caption: "",
    image: "/images/photo-2.jpg",
    offsetClass: "md:translate-y-16",
    sizeClass: "h-[300px] md:h-[360px] w-[200px] md:w-[230px]",
  },
  {
    id: "s3",
    title: "",
    location: "",
    caption: "",
    image: "/images/photo-7.jpg",
    offsetClass: "md:-translate-y-2",
    sizeClass: "h-[240px] md:h-[280px] w-[170px] md:w-[190px]",
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: "d1",
    name: "",
    region: "",
    location: "Bali, Indonesia",
    category: "Surf",
    kind: "Open Trip",
    price: 530,
    dates: "12–14 August",
    image: "/images/photo-1.jpg",
    aircraftCount: 4,
    amenities: {
      stay: "2× of Lakeside Villa",
      transport: "Private driver",
      meals: "Full board",
    },
  },
  {
    id: "d2",
    name: "",
    region: "",
    location: "Toba Lake, Sumatra",
    category: "Stay",
    kind: "Private",
    price: 450,
    dates: "12–14 August",
    image: "/images/photo-2.jpg",
    aircraftCount: 2,
    amenities: {
      stay: "2× of Lakeside Villa",
      transport: "Private driver",
      meals: "Full board",
    },
  },
  {
    id: "d3",
    name: "",
    region: "",
    location: "Altai, Mongolia",
    category: "Wildlife",
    kind: "Open Trip",
    price: 530,
    dates: "12–14 August",
    image: "/images/photo-3.jpg",
    aircraftCount: 2,
    amenities: {
      stay: "2× of Lakeside Villa",
      transport: "Private driver",
      meals: "Full board",
    },
  },
  {
    id: "d4",
    name: "",
    region: "",
    location: "Bangli, East Bali",
    category: "Culture",
    kind: "Retreat",
    price: 380,
    dates: "18–21 September",
    image: "/images/photo-4.jpg",
    aircraftCount: 1,
    amenities: {
      stay: "Village homestay",
      transport: "Local bicycle",
      meals: "Farm breakfast",
    },
  },
  {
    id: "d5",
    name: "",
    region: "",
    location: "Kyoto, Japan",
    category: "Wellness",
    kind: "Private",
    price: 890,
    dates: "02–06 October",
    image: "/images/photo-5.jpg",
    aircraftCount: 3,
    amenities: {
      stay: "Ryokan suite",
      transport: "Rail pass",
      meals: "Kaiseki",
    },
  },
  {
    id: "d6",
    name: "",
    region: "",
    location: "Patagonia, Chile",
    category: "Hiking",
    kind: "Adventure",
    price: 1240,
    dates: "08–15 November",
    image: "/images/photo-7.jpg",
    aircraftCount: 2,
    amenities: {
      stay: "Refugio lodges",
      transport: "Park transfer",
      meals: "Trail board",
    },
  },
];

export const HERO_IMAGE = "/images/hero.jpg";
