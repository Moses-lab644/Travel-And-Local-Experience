import { findPlaceById, findActivityById } from "./services/discoveryService.js";
import { activities } from "./data/discoveryRecords.js";

const knownPlaceId = "place-demo-001";
const knownActivityId = "activity-demo-001";
const unknownId = "activity-demo-999";

console.log("Lookup found place:", findPlaceById(knownPlaceId));
console.log("Lookup found activity:", findActivityById(knownActivityId));
console.log("Lookup unavailable activity:", findActivityById(unknownId));
console.log("Total activities loaded:", activities.length);