export interface Location {
  city: string;
  area: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  location: Location;
  category: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: Location;
  category: string;
  durationMinutes: number;
}

export type LookupResult<T> =
  | { found: true; record: T }
  | { found: false };