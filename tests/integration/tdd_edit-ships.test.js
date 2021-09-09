const request = require("supertest");
const { Ship } = require("../../models/ship");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

describe("PUT /api/ships/:id", () => {
  let server;
  let token;
  let name;
  let imo;
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
});
