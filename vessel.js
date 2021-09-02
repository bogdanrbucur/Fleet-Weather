// Module contains the vessel class

const debug = require("debug")("app:vessel"); // $env:DEBUG="app:vessel" to see

// Import functions to parse data
const {
  getSpeed,
  getCoordinates,
  getArea,
  getDestination,
  getETA,
  getAge,
} = require("./parse");
const getShipInfo = require("./getShipInfo");
const getWeather = require("./getWeather");

class Vessel {
  constructor(name, imo) {
    this.name = name;
    this.imo = imo;
  }

  // In order to use await, parent function must be decorated with async
  async update() {
    try {
      // getShipInfo returns a Promise. When the promise is resolved, store the result in a variable
      const shipInfoText = await getShipInfo(this.name, this.imo);
      // shipInfoText is text from the VesselFinder page where info about the ship is located
      // update vessel properties based on scraped data using parse functions from parse module
      this.area = getArea(shipInfoText);
      this.coordinates = getCoordinates(shipInfoText);
      this.speed = getSpeed(shipInfoText);
      this.destination = getDestination(shipInfoText);
      this.eta = getETA(shipInfoText);
      this.dataAge = getAge(shipInfoText);

      // Scrape Windy for weather
      const weather = await getWeather(this.coordinates);
      // weather is an array with all wind gusts shown on the page
      debug(`Got weather:${weather}`);
      debug(`Wind now: ${weather[3]}`);
      debug(`Wind 6H: ${weather[5]}`);
      this.windNow = parseFloat(weather[3]); // Corresponds to the wind gusts now in Windy
      this.wind6H = parseFloat(weather[5]); // Corresponds to the wind gusts in 6H in Windy
      debug(this);
    } catch (err) {
      debug("ERROR", err, err.message);
    }
  }
}

module.exports = Vessel;
