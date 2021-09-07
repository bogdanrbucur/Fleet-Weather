const request = require("supertest");
const { User } = require("../../models/user");

let server;

describe("/api/users", () => {
  beforeEach(() => {
    server = require("../../app"); // Get the initialized server before each test
  });
  afterEach(async () => {
    server.close(); // Close the server after each test
    await User.remove({}); // Clean the db
  });
  describe("DELETE /:id", () => {
    it("should delete requested user", async () => {
      // Populate the db with some mock ships
      let user = await User.collection.insertOne({
        name: "test_user",
        email: "test@email.com",
      });

      const res = await request(server).delete(`/api/users/${user._id}`);
      expect(res.status).toBe(200);
      expect(res.body.some((u) => u.name === "test_user")).toBeTruthy();
      expect(
        res.body.some((u) => u.email === "test@email.com")
      ).toBeTruthy();
    });
    it("should return 404 if invalid ID is passed", async () => {
      const res = await request(server).delete("/api/users/1");

      expect(res.status).toBe(404);
    });
  });
});
