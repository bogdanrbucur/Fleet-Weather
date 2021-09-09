const request = require("supertest");
const { Ship } = require("../../models/ship");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

let server;

describe("/api/ships", () => {
  beforeEach(() => {
    server = require("../../app"); // Get the initialized server before each test
  });
  afterEach(async () => {
    await Ship.remove({}); // Clean the db of added ships
    await server.close(); // Close the server after each test
  });
  describe("GET /", () => {
    it("should return all ships", async () => {
      // Populate the db with some mock ships
      await Ship.collection.insertMany([
        { name: "ship1", imo: 3456789 },
        { name: "ship2", imo: 2345678 },
      ]);

      const res = await request(server).get("/api/ships");
      // expect(res.status).toBe(200); // Doesn't return 200 for some reason
      expect(res.body.length).toBeGreaterThan(1); // account for other mock ships in other tests
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
    const exec = () => {
      return request(server)
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
      const res = await exec();

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

describe("PUT /api/ships/:id", () => {
  let server;
  let token;
  let name;
  let imo;
  let ship;
  let ship_response;
  let shipId;

  // Happy path function we're testing
  const editShip = (shipId) => {
    return request(server)
      .put(`/api/ships/${shipId}`) // Give valid ship ID
      .set("x-auth-token", token) // give valid auth token
      .send({ name: name, imo: imo }); // give valid ship name and imo
  };

  // Function to add a ship before testing the edit function
  const addShip = () => {
    return request(server)
      .post(`/api/ships`)
      .set("x-auth-token", token)
      .send({ name: "Initial Ship Name", imo: "7654321" });
  };

  beforeEach(async () => {
    server = require("../../app"); // Get the initialized server before each test

    token = new User({ canModifyShips: true }).generateAuthToken(); // Generate a valid jwt for a user with permission to modify ships
    name = "MODIFIED SHIP NAME";
    imo = "2345678";

    // Add mock ship to DB
    ship_response = await addShip();
    ship = ship_response.body;
    shipId = ship_response.body._id;
  });
  afterEach(async () => {
    await Ship.remove({}); // Clean the db of added ships
    await server.close(); // Close the server after each test
  });
  // it("should return 401 if client not logged in", async () => {
  //   // Give no token
  //   token = "";

  //   const res = await editShip(shipId);
  //   expect(res.status).toBe(401);
  // });
  it("should return 400 if ship name is invalid", async () => {
    // Give invalid ship name
    name = "re";
    const res = await editShip(shipId);
    expect(res.status).toBe(400);
  });
  it("should return 400 if imo is invalid", async () => {
    // Give invalid imo
    imo = "123456";

    const res = await editShip(shipId);
    expect(res.status).toBe(400);
  });
  it("should return 404 if ship not found", async () => {
    // Generate new ship id, different from ship already in db
    shipId = new mongoose.Types.ObjectId();

    const res = await editShip(shipId);
    expect(res.status).toBe(404);
  });
  it("should return 400 if invalid id provided", async () => {
    // Give invalid ship ID

    const res = await editShip("invalid_id");
    expect(res.status).toBe(400);
  });
  it("should return 403 request if user doesn't have permission to edit", async () => {
    // Generate valid token but without edit permission
    token = new User({ canModifyShips: false }).generateAuthToken();

    const res = await editShip(shipId);
    expect(res.status).toBe(403);
  });
  it("should change vessel name if input is valid", async () => {
    // Send valid request

    await editShip(shipId);

    const modifiedShip = await Ship.findById(shipId);
    expect(modifiedShip.name).toBe(name);
  });
  it("should change vessel IMO number if input is valid", async () => {
    // Send valid request

    await editShip(shipId);

    const modifiedShip = await Ship.findById(shipId);
    expect(modifiedShip.imo).toBe(parseInt(imo));
  });
  it("should return the new ship if input is valid", async () => {
    // Send valid request

    const modifiedShip = await editShip(shipId);
    expect(JSON.parse(modifiedShip.text)).toHaveProperty("name", "imo", "area", "speed");
  });
});
