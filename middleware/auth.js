const jwt = require("jsonwebtoken");
const { jwtAuthKey } = require("../startup/config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token"); // Get token from request header
  if (!token) return res.status(401).send("Access denined. No token provided.");

  try {
    const decoded = jwt.verify(token, jwtAuthKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
