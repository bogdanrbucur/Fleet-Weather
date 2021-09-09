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
      .send({ name: "Initial Ship Name", imo: 7654321 });
  };

  beforeEach(async () => {
    server = require("../../app"); // Get the initialized server before each test

    token = new User({ canModifyShips: true }).generateAuthToken(); // Generate a valid jwt for a user with permission to modify ships
    name = "Modified Ship Name";
    imo = 2345678;

  });
  afterEach(async () => {
    await Ship.remove({}); // Clean the db of added ships
    await server.close(); // Close the server after each test
  });
  it("should work!", async () => {
    // Add mock ship to DB
    const ship = await addShip();

    // Confirm the ship is in db
    const res = await request(server).get("/api/ships");
    expect(res).not.toBeNull();
  });
});
