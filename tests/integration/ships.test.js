const request = require("supertest");
const { Ship } = require("../../models/ship");
const { User } = require("../../models/user");

let server;

describe("/api/ships", () => {
  beforeEach(() => {
    server = require("../../app"); // Get the initialized server before each test
  });
  afterEach(async () => {
    server.close(); // Close the server after each test
    await Ship.remove({}); // Clean the db of added ships
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
      expect(res.body.length).toBe(2);
      expect(res.body.some((ship) => ship.name === "ship1")).toBeTruthy();
      expect(res.body.some((ship) => ship.name === "ship2")).toBeTruthy();
    });
  });
  describe("POST /", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await request(server)
        .post("/api/ships")
        .send({ name: "Test Ship", imo: 1234567 });

      expect(res.status).toBe(401);
    });
    it("should return 400 if ship IMO number is not 7 chars long", async () => {
      const token = new User({ canModifyShips: true }).generateAuthToken(); // Create new user jwt token that has permission to modify ships

      const res = await request(server)
        .post("/api/ships")
        .set("x-auth-token", token) // pass the jwt token in the header to have permission to operate on the db
        .send({ name: "Test Ship", imo: "123456" });
      expect(res.status).toBe(400);
    });
    it("should return 400 if ship name is not longer than 3 characters", async () => {
      const token = new User({ canModifyShips: true }).generateAuthToken(); // Create new user jwt token that has permission to modify ships

      const res = await request(server)
        .post("/api/ships")
        .set("x-auth-token", token) // pass the jwt token in the header to have permission to operate on the db
        .send({ name: "Te", imo: "1234567" });
      expect(res.status).toBe(400);
    });
    it("should return 400 if ship name is longer than 50 characters", async () => {
      const token = new User({ canModifyShips: true }).generateAuthToken(); // Create new user jwt token that has permission to modify ships

      const name = new Array(52).join("a"); // Generate a string 51 chars long

      const res = await request(server)
        .post("/api/ships")
        .set("x-auth-token", token) // pass the jwt token in the header to have permission to operate on the db
        .send({ name: name, imo: "2345678" });
      expect(res.status).toBe(400);
    });
    // Happy path
    it("should return 200 if succesfully added", async () => {
      const token = new User({ canModifyShips: true }).generateAuthToken(); // Create new user jwt token that has permission to modify ships

      const res = await request(server)
        .post("/api/ships")
        .set("x-auth-token", token)
        .send({ name: "Test Ship", imo: "1234567" });
      expect(res.status).toBe(200);
    });
    it("should return the ship's name in capital letters if succesfully added", async () => {
      const token = new User({ canModifyShips: true }).generateAuthToken(); // Create new user jwt token that has permission to modify ships

      const res = await request(server)
        .post("/api/ships")
        .set("x-auth-token", token)
        .send({ name: "Test Ship", imo: "1234567" });
      expect(res.body).toMatchObject({ name: "TEST SHIP" });
    });
    it("should be in the database if succesfully added", async () => {
      const token = new User({ canModifyShips: true }).generateAuthToken(); // Create new user jwt token that has permission to modify ships

      const res = await request(server)
        .post("/api/ships")
        .set("x-auth-token", token)
        .send({ name: "Test Ship", imo: "1234567" });

      const ship = await Ship.find({ imo: 1234567 });

      expect(ship).not.toBeNull();
    });
  });
});
