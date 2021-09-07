const request = require("supertest");
const { Ship } = require("../../models/ship");

let server;

describe("/api/ships", () => {
  beforeEach(() => {
    server = require("../../app"); // Get the initialized server before each test
  });
  afterEach(() => {
    server.close(); // Close the server after each test
  });
  describe("GET /", () => {
    it("should return all ships", async () => {
      // Populate the db with some mock ships
      await Ship.collection.insertMany([
        { name: "ship1", imo: 1234567 },
        { name: "ship2", imo: 2345678 },
      ]);

      const res = await request(server).get("/api/ships");
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(2);
    });
  });
});
