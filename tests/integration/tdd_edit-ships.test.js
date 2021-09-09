const request = require("supertest");
const { Ship } = require("../../models/ship");
const { User } = require("../../models/user");

describe("PUT /api/ships/:id", () => {
  let server;
  let token;
  let name;
  let imo;
  let shipId;  

  beforeEach(() => {
    server = require("../../app"); // Get the initialized server before each test
    token = new User({ canModifyShips: true }).generateAuthToken(); // Generate a valid jwt for a user with permission to modify ships
  });
  afterEach(async () => {
    await Ship.remove({}); // Clean the db of added ships
    await server.close(); // Close the server after each test
  });
  it("should work!", async () => {
    const res = await request(server).get("/api/ships");
    expect(res).not.toBeNull();
  });
});
