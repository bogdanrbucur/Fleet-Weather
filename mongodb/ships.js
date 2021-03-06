// Module for interfacing with MongoDB via Mongoose and updating the ships in db

const winston = require("winston");
const debug = require("debug")("app:db-ships"); // $env:DEBUG="app:*" / export DEBUG="app:*" to see all debugs
const {
  getSpeed,
  getCoordinates,
  getArea,
  getDestination,
  getETA,
  getAge,
} = require("../parse");
const getShipInfo = require("../getShipInfo");
const getWeather = require("../getWeather");
const { Ship } = require("../models/ship"); // Get the Mongoose ship model
const { coordinatesToWindyLink } = require("../parse"); // Import function from parse

// Create new ship and add it to DB
async function createShip(body) {
  let ship = new Ship({
    name: body.name,
    imo: body.imo,
  });

  try {
    winston.info(`Added ship ${ship.name}, IMO: ${ship.imo}`);
    return await ship.save(); // returns saved document
  } catch (err) {
    winston.error(err.message);
  }
}

// Delete a ship from DB
async function deleteShip(id) {
  try {
    const result = await Ship.deleteOne({ _id: id });
    winston.warn("DELETED: ", result);
  } catch (err) {
    winston.error(err.message);
  }
}

async function getShips() {
  try {
    return await Ship.find(); // Get all documents
  } catch (err) {
    winston.error(err);
  }

  // .find({name: "Bro Nibe"}); // Get documents matching criteria
  // .find({speed: { $gte: 10 } }); // Speed >= 10
  // .find({speed: { $gte: 10, $lte: 20 } }); // Speed >= 10 <= 20
  // .find({speed: { $in: [10, 15, 20] } }); // Speed 10 or 15 or 20
  // .find({name: /^Maersk/ }); // Name starts with Maersk

  // .limit(10); // Get maximum 10 documents
  // .sort({name: 1}); // 1 = ascending order
  // .select({name, area}); // Get only name and area of the documents
  // .count() // Get the number of documents matching the critera
}

async function updateShip(id) {
  try {
    // Get this ship by id
    const ship = await Ship.findById(id);
    // Check if it exists
    if (!ship) {
      winston.warn(`Ship with id ${id} not found in database.`);
      return;
    }
    // Get the shipInfoText from VesselFinder using the name and imo number
    const shipInfoText = await getShipInfo(ship.name, ship.imo);

    // Set ship properties using shipInfoText
    ship.set({
      area: getArea(shipInfoText),
      coordinates: getCoordinates(shipInfoText),
      speed: getSpeed(shipInfoText),
      destination: getDestination(shipInfoText),
      eta: getETA(shipInfoText),
      dataAge: getAge(shipInfoText),
    });
    // Scrape Windy for weather
    const weather = await getWeather(ship.coordinates);

    ship.set({
      windyLink: coordinatesToWindyLink(ship.coordinates), // Store the Windy link to ship's position for client reference
      windNow: parseFloat(weather[3]), // Corresponds to the wind gusts around he present in Windy
      wind6H: parseFloat(weather[5]), // Corresponds to the wind gusts in about 6 hours in Windy
    });

    const savedShip = await ship.save();
    debug("Updated in database:");
    debug(savedShip);
  } catch (err) {
    debug(err);
  }
}

async function modifyShip(id, body) {
  try {
    // Get this ship by id
    const ship = await Ship.findById(id);
    // Check if it exists
    if (!ship) {
      winston.warn(`Ship with id ${id} not found in database.`);
      return;
    }
    winston.info(
      `Modified ship: ${ship.name} -> ${body.name}, ${ship.imo} -> ${body.imo}.`
    );
    ship.set({
      name: body.name,
      imo: body.imo,
    });

    return await ship.save();
  } catch (err) {
    winston.warn(err.message);
  }
}

module.exports.getShips = getShips;
module.exports.updateShip = updateShip;
module.exports.createShip = createShip;
module.exports.deleteShip = deleteShip;
module.exports.modifyShip = modifyShip;
