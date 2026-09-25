import { places, activities } from "../data/discoveryRecords.js";
import type { Place, Activity, LookupResult } from "../types/discovery.js";

export function findPlaceById(id: string): LookupResult<Place> {
  const record = places.find((place) => place.id === id);
  return record ? { found: true, record } : { found: false };
}

export function findActivityById(id: string): LookupResult<Activity> {
  const record = activities.find((activity) => activity.id === id);
  return record ? { found: true, record } : { found: false };
}