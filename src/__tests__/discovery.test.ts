import request from "supertest";
import { app } from "../app.js";

describe("GET /places/:id", () => {
  it("returns 200 and the place data for a known id", async () => {
    const response = await request(app).get("/places/place-demo-001");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.data).toMatchObject({
      id: "place-demo-001",
      name: "Lantern Table",
      category: "restaurant",
    });
  });

  it("returns 400 for a malformed id", async () => {
    const response = await request(app).get("/places/invalid@id!");

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toMatch(/letters, numbers, and hyphens/);
  });

  it("returns 404 for a well-formed but unknown id", async () => {
    const response = await request(app).get("/places/place-demo-999");

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Place not found");
  });
});