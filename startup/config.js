// Module to import env variables
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  shipsEndpoint: process.env.SHIPS_ENDPOINT,
  port: process.env.PORT,
  dbURL: process.env.DB_URL,
  jwtAuthKey: process.env.JWT_AUTH_KEY
};