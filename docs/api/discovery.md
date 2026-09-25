# Discovery API Contract — Nearby Places and Activities

## Operation

`GET /places`

Returns places and nearby activities for a traveler's current location, so the mobile app can show options (e.g. before a walking tour in Lisbon).

## Request

### Example request


GET /places?lat=38.7139&lng=-9.1466&radius=1000


### Query parameters

| Name     | Type   | Required | Description                                      |
|----------|--------|----------|---------------------------------------------------|
| `lat`    | number | yes      | Latitude, between -90 and 90                       |
| `lng`    | number | yes      | Longitude, between -180 and 180                    |
| `radius` | number | no       | Search radius in meters. Default 1000, max 5000    |

### Validation rules

- `lat` and `lng` must be present and numeric.
- `lat` must be between -90 and 90.
- `lng` must be between -180 and 180.
- `radius`, if provided, must be a positive number no greater than 5000.
- Any violation results in a 400 response before any lookup is attempted.

## Response shape

Each place includes its own nearby activities.

| Field                     | Type   | Description                              |
|---------------------------|--------|-------------------------------------------|
| `id`                      | string | Place identifier                          |
| `name`                    | string | Place name                                |
| `category`                | string | Place category (e.g. "viewpoint", "cafe") |
| `distanceMeters`          | number | Distance from the request location        |
| `activities`              | array  | Activities available at this place        |
| `activities[].id`         | string | Activity identifier                       |
| `activities[].name`       | string | Activity name                             |
| `activities[].type`       | string | Activity type (e.g. "tour", "class")      |

## Responses

### 200 OK — successful request

json
{
  "status": "ok",
  "data": [
    {
      "id": "place_123",
      "name": "Miradouro de Santa Catarina",
      "category": "viewpoint",
      "distanceMeters": 240,
      "activities": [
        {
          "id": "activity_45",
          "name": "Sunset Walking Tour",
          "type": "tour"
        }
      ]
    }
  ]
}


- If no places are found within the radius, `data` is an empty array — this is still a 200, not a 404, because the request was valid and correctly answered.

### 400 Bad Request — invalid input

json
{
  "status": "error",
  "message": "lat must be between -90 and 90"
}


- Returned when a required parameter is missing, non-numeric, or out of range.
- The message names the specific parameter and constraint that failed.

### 404 Not Found — unavailable resource

Applies to a related single-place lookup, `GET /places/{id}`, used when a client already has a place `id` and wants its full detail.

Example request:


GET /places/place_999


Example response:

json
{
  "status": "error",
  "message": "Place not found"
}


- Returned when the given `id` does not correspond to any known place.

### 500 Internal Server Error — unexpected failure

json
{
  "status": "error",
  "message": "Something went wrong"
}


- Returned only for unexpected server-side failures, not for bad input.

## Mobile client guidance

- **200 with results**: render the list of places, each with its nested activities.
- **200 with empty `data`**: show a "no places found nearby" state, not an error.
- **400**: show a message asking the traveler to check their location/search settings; this indicates a client-side input problem, not a server issue.
- **404** (on `GET /places/{id}`): show a "this place is no longer available" state.
- **500**: show a generic retry option; this indicates a server-side issue unrelated to the input.

## Out of scope for this task

This defines the contract only. It excludes itinerary management, booking, authentication, offline synchronization, and real provider integration. No route implementation, database queries, or tests are included here — those are covered in later tasks.