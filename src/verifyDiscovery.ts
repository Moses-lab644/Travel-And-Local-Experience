import { findPlaceById, findActivityById } from "./services/discoveryService.js";
import { activities, places } from "./data/discoveryRecords.js";

const knownPlaceId = "place-demo-001";
const knownPlaceId2 = "place-demo-002";
const knownActivityId = "activity-demo-001";
const unknownId = "activity-demo-999";

console.log("Lookup found place 1:", findPlaceById(knownPlaceId));
console.log("Lookup found place 2:", findPlaceById(knownPlaceId2));
console.log("Lookup found activity:", findActivityById(knownActivityId));
console.log("Lookup unavailable activity:", findActivityById(unknownId));
console.log("Total places loaded:", places.length);
console.log("Total activities loaded:", activities.length);