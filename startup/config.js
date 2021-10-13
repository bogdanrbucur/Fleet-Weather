// Module to import env variables
require("dotenv").config();

module.exports = {
  shipsEndpoint: process.env.SHIPS_ENDPOINT,
  port: process.env.PORT,
  dbURL: process.env.DATABASE_HOST,
  jwtAuthKey: process.env.JWT_AUTH_KEY,
};
