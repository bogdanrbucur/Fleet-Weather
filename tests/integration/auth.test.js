const request = require("supertest");
const { User } = require("../../models/user");
const { Ship } = require("../../models/ship");

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../app"); // Get the initialized server before each test
    token = new User({
      canModifyShips: true,
      canModifyUsers: true,
    }).generateAuthToken(); // Create new user jwt token that has permission to modify ships
  });
  afterEach(async () => {
    await User.remove({});
    await server.close(); // Close the server after each test
  });

  describe("/api/ships", () => {
    let token;

    const exec = () => {
      return request(server)
        .post("/api/ships")
        .set("x-auth-token", token)
        .send({ name: "Test Ship", imo: "1234567" });
    };

    it("should return 401 if no token is provided", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if invalid token is provided", async () => {
      token = "randomString";

      const res = await exec();

      expect(res.status).toBe(400);
    });
  });
  describe("/api/users", () => {
    let token;

    const deleteUser = (id) => {
      return request(server)
        .post(`/api/users/${id}`)
        .set("x-auth-token", token);
    };
  });
});
