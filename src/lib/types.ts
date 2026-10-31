export type TripKind = "Open Trip" | "Private" | "Retreat" | "Adventure";

export type Category =
  | "Surf"
  | "Hiking"
  | "Culture"
  | "Stay"
  | "Wellness"
  | "Wildlife";

export interface Destination {
  id: string;
  name: string;
  region: string;
  location: string;
  category: Category;
  kind: TripKind;
  price: number;
  dates: string;
  image: string;
  aircraftCount?: number;
  amenities: {
    stay: string;
    transport: string;
    meals: string;
  };
}

export interface ShowcasePlace {
  id: string;
  title: string;
  location: string;
  caption: string;
  image: string;
  offsetClass: string;
  sizeClass: string;
}

export interface Reviewer {
  id: string;
  name: string;
  avatar: string;
}

export interface SearchFilters {
  activity: string;
  location: string;
  dateLabel: string;
  dateStart: Date | undefined;
  dateEnd: Date | undefined;
  budget: string;
  destinationQuery: string;
  category: string;
  priceBand: string;
  dateBand: string;
}

export const EMPTY_FILTERS: SearchFilters = {
  activity: "",
  location: "",
  dateLabel: "",
  dateStart: undefined,
  dateEnd: undefined,
  budget: "",
  destinationQuery: "",
  category: "",
  priceBand: "",
  dateBand: "",
};
