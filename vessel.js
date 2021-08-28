// Module contains the vessel class

const debug = require("debug")("app:vessel"); // $env:DEBUG="app:vessel" to see

const {
  getSpeed,
  getCoordinates,
  getArea,
  getDestination,
  getETA,
  getAge,
} = require("./parse");
const getShipInfo = require("./getShipInfo");
// const getWeather = require("./getWeather");

class Vessel {
  constructor(name, imo) {
    this.name = name;
    this.imo = imo;
  }

  update() {
    getShipInfo(this.name, this.imo, (shipInfoText) => {
      // shipInfoText is text from the VesselFinder page where info about the ship is located
      // update vessel properties based on scraped data
      this.area = getArea(shipInfoText);
      this.coordinates = getCoordinates(shipInfoText);
      this.speed = getSpeed(shipInfoText);
      this.destination = getDestination(shipInfoText);
      this.eta = getETA(shipInfoText);
      this.dataAge = getAge(shipInfoText);

      // getWeather(getCoordinates(shipInfoText)){}

      debug(this);
    });
  }
}

module.exports = Vessel;
