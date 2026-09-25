import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { Place, Activity } from "../types/discovery.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, "../../fixtures/discovery-records.json");

interface DiscoveryFixture {
  places: Place[];
  activities: Activity[];
  knownUnavailableId: string;
}

const raw = readFileSync(fixturePath, "utf-8");
const fixture: DiscoveryFixture = JSON.parse(raw);

export const places: Place[] = fixture.places;
export const activities: Activity[] = fixture.activities;