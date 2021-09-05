// Module for interfacing with MongoDB via Mongoose and updating the ships in db

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

// Future implementation
async function createShip() {
  const ship = new Ship({
    name: "Maersk Whatever",
    imo: 123456789,
  });

  try {
    const result = await ship.save(); // returns saved document
    debug("Updated:", result);
  } catch (err) {
    debug(err.message);
  }
}

// Future implementation
async function deleteShip(id) {
  try {
    const result = await Ship.deleteOne({ _id: id });
    debug("DELETED: ", result);
  } catch (err) {
    debug(err.message);
  }
}

async function getShips() {
  // MongoDB comparison operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  try {
    return await Ship.find(); // Get all documents
  } catch (err) {
    debug(err);
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
      debug(`Ship with id ${id} not found in database.`);
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

module.exports.getShips = getShips;
module.exports.updateShip = updateShip;