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
  describe("POST /", () => {
    it("should return saved user", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ name: "name1", email: "test@email1.com", password: "123456" });
      expect(res.email).toBe("test@email1.com");
    });
    it("should return 400 if user format is invalid", async () => {
      const res = await request(server)
        .post("/api/users")
        .send({ name: "name1", email: "test@email1.com" });
      expect(res).toBe(400);
    });
  });
  // describe("DELETE /:id", () => {
  //   it("should delete requested user", async () => {
  //     // Populate the db with some mock ships
  //     let user = await User.collection.insertOne({
  //       name: "test_user",
  //       email: "test@email.com",
  //     });

  //     const res = await request(server).delete(`/api/users/${user._id}`);
  //     expect(res.body.email === "test@email.com").toBeTruthy();
  //   });
  //   it("should return 404 if invalid ID is passed", async () => {
  //     const res = await request(server).delete("/api/users/1");

  //     expect(res.status).toBe(404);
  //   });
  // });
});
