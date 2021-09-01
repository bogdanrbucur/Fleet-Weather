// Module to import env variables

const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  updateEndpoint: process.env.UPDATE_ENDPOINT,
  port: process.env.PORT,
  dbURL: process.env.DB_URL,
  chromiumPath: process.env.CHROMIUM_PATH
};