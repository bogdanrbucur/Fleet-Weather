const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const { jwtAuthKey } = require("../../../startup/config");
const mongoose = require("mongoose");

describe("user.generateAuthToken", () => {
  it("should generate a valid JWT token using user ID and permissions", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      canModifyShips: true,
      canModifyUsers: true,
    };
    let user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, jwtAuthKey);
    expect(decoded).toMatchObject(payload);
  });
});
