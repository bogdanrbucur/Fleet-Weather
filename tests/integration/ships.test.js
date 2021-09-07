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
      expect(res.body.length).toBeGreaterThan(1);
      expect(res.body.some((ship) => ship.name === "ship1")).toBeTruthy();
      expect(res.body.some((ship) => ship.name === "ship2")).toBeTruthy();
    });
  });
  describe("POST /", () => {
    // Define the happy path, and then in each test, we change one parameter
    // that clearly alings with the name of the test.
    let token;
    let name;
    let imo;

    // function that holds the happy path call to be called in each test
    const exec = async () => {
      return await request(server)
        .post("/api/ships")
        .set("x-auth-token", token)
        .send({ name: name, imo: imo });
    };

    beforeEach(() => {
      // Happy path values to be changed locally in each test
      token = new User({ canModifyShips: true }).generateAuthToken(); // Create new user jwt token that has permission to modify ships
      name = "Test Ship";
      imo = "1234567";
    });

    it("should return 401 if user is not logged in", async () => {
      token = ""; // Because we don't want to have a valid token here, we overwrite it

      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 400 if ship IMO number is not 7 chars long", async () => {
      imo = "123456";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if ship name is not longer than 3 characters", async () => {
      name = "Te";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if ship name is longer than 50 characters", async () => {
      name = new Array(52).join("a"); // Generate a string 51 chars long

      const res = await exec();

      expect(res.status).toBe(400);
    });
    // Happy path
    it("should return 200 if succesfully added", async () => {
      const res = exec();

      expect(res.status).toBe(200);
    });
    it("should return the ship's name in capital letters if succesfully added", async () => {
      const res = await exec();

      expect(res.body).toMatchObject({ name: "TEST SHIP" });
    });
    it("should be in the database if succesfully added", async () => {
      await exec();

      const ship = await Ship.find({ imo: 1234567 });

      expect(ship).not.toBeNull();
    });
  });
});
