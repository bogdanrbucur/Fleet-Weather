const request = require("supertest");
const { Ship } = require("../../models/ship");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

describe("PUT /api/ships/:id", () => {
  let server;
  let token;
  let name;
  let imo;
  let shipId;
  let ship;

  // The function we're testing
  const editShip = (shipId) => {
    return request(server)
      .put(`/api/ships/${shipId}`)
      .set("x-auth-token", token)
      .send({ name: name, imo: imo });
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
    name = "Modified Ship Name";
    imo = "2345678";

    // Add mock ship to DB
    ship = await addShip();
  });
  afterEach(async () => {
    await Ship.remove({}); // Clean the db of added ships
    await server.close(); // Close the server after each test
  });
  it("should return 401 if client not logged in", async () => {
    // Give no token
    token = "";

    const res = await editShip(ship._id);
    expect(res.status).toBe(401);
  });
  it("should return 400 if ship name is invalid", async () => {
    // Give invalid ship name
    name = "re";

    const res = await editShip(ship._id);
    expect(res.status).toBe(400);
  });
});
