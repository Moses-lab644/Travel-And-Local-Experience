# Discovery API Contract — Nearby Places

## Operation

`GET /places`

Returns places and activities near a traveler's current location, so the mobile app can show nearby options (e.g. before a walking tour in Lisbon).

## Request

### Query parameters

| Name     | Type   | Required | Description                                  |
|----------|--------|----------|-----------------------------------------------|
| `lat`    | number | yes      | Latitude, between -90 and 90                  |
| `lng`    | number | yes      | Longitude, between -180 and 180               |
| `radius` | number | no       | Search radius in meters. Default 1000, max 5000 |

### Validation rules

- `lat` and `lng` must be present and numeric.
- `lat` must be between -90 and 90.
- `lng` must be between -180 and 180.
- `radius`, if provided, must be a positive number no greater than 5000.
- Any violation results in a 400 response before any lookup is attempted.

## Responses

### 200 OK — success (including no results)

```json
{
  "status": "ok",
  "data": [
    {
      "id": "place_123",
      "name": "Miradouro de Santa Catarina",
      "category": "viewpoint",
      "distanceMeters": 240
    }
  ]
}
```

- If no places are found within the radius, `data` is an empty array — this is still a 200, not a 404, because the request was valid and correctly answered.

### 400 Bad Request — invalid input

```json
{
  "status": "error",
  "message": "lat must be between -90 and 90"
}
```

- Returned when a required parameter is missing, non-numeric, or out of range.
- The message names the specific parameter and constraint that failed.

### 500 Internal Server Error — unexpected failure

```json
{
  "status": "error",
  "message": "Something went wrong"
}
```

- Returned only for unexpected server-side failures, not for bad input.

## Mobile client guidance

- **200 with results**: render the list of nearby places.
- **200 with empty `data`**: show a "no places found nearby" state, not an error.
- **400**: show a message asking the traveler to check their location/search settings; this indicates a client-side input problem, not a server issue.
- **500**: show a generic retry option; this indicates a server-side issue unrelated to the input.

## Out of scope for this task

This defines the contract only. No route implementation, database queries, or tests are included here — those are covered in later tasks.