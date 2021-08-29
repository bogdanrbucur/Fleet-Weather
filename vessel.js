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
const getWeather = require("./getWeather");

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

      getWeather(this.coordinates, (weather) => {
        debug(`Got weather:${weather}`);
        debug(`Wind now: ${weather[3]}`);
        debug(`Wind 6H: ${weather[5]}`);
        this.windNow = weather[3]; // Corresponds to the wind gusts now in Windy
        this.wind6H = weather[5]; // Corresponds to the wind gusts in 6H in Windy
        debug(this);
      });

      // this.windNow = getWeather(this.coordinates, (weather) => {
      //   return weather[3];
      // });
      // this.wind6H = getWeather(this.coordinates, (weather) => {
      //   return weather[5];
      // });

    });
  }
}

module.exports = Vessel;
