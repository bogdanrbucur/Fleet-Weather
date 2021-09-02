// Contains functions to parse various texts in the app, mainly from VesselFinder

function getArea(text) {
  let startIndex = text.indexOf("is at") + 6;
  let endIndex = text.indexOf("(") - 1;
  area = text.slice(startIndex, endIndex);
  return area;
}

function getCoordinates(text) {
  let startIndex = text.indexOf("coordinates") + 12;
  let endIndex = text.indexOf(")");
  coordinates = text.slice(startIndex, endIndex);
  return coordinates;
}

function getAge(text) {
  let startIndex = text.indexOf("reported") + 9;
  let endIndex = text.indexOf("ago") - 1;
  age = text.slice(startIndex, endIndex);
  return age;
}

function getDestination(text) {
  if (text.indexOf("the port of") !== -1) {
    let startIndex = text.indexOf("the port of") + 12;
    let endIndex = text.indexOf(",");
    destination = text.slice(startIndex, endIndex);
  } else if (text.indexOf("en route to") !== -1) {
    let startIndex = text.indexOf("en route to") + 12;
    let endIndex = text.indexOf(",");
    destination = text.slice(startIndex, endIndex);
  } else destination = "Unavailable";

  return destination;
}

function getSpeed(text) {
  if (text.indexOf("speed of") !== -1) {
    let startIndex = text.indexOf("speed of") + 9;
    let endIndex = startIndex + 4;
    speed = text.slice(startIndex, endIndex);
    speed = parseFloat(speed);
    return speed;
  } else return 0;
}

function getETA(text) {
  if (text.indexOf("there on") !== -1) {
    let startIndex = text.indexOf("there on") + 9;
    let endIndex = text.indexof(".", startIndex);
    eta = text.slice(startIndex, endIndex);
  } else if (text.indexOf("arrived at") !== -1) {
    let startIndex = text.indexOf(" on ") + 4;
    let endIndex = text.indexof(".", startIndex);
    eta = text.slice(startIndex, endIndex);
  } else eta = "Unavailable";
  return eta;
}

function parseIP(text) {
  let startIndex = text.indexOf(":", 3) + 1;
  return text.slice(startIndex, text.length);
}

function coordinatesToURL(text) {
  coordArray = text.split("/"); // For using the name in the URL
  lat = coordArray[0];
  long = coordArray[1];

  while (lat.includes(" ")) lat = lat.replace(" ", "");
  while (long.includes(" ")) long = long.replace(" ", "");

  // If latitude is N
  if (lat.includes("N")) {
    lat = lat.replace("N", "");
    // If latitude is S
  } else {
    lat = lat.replace("S", "");
    lat = "-" + lat;
  }

  // If longitude is E
  if (long.includes("E")) {
    long = long.replace("E", "");
    // If longitude is W
  } else {
    long = long.replace("W", "");
    long = "-" + long;
  }

  return `https://www.windy.com/${lat}/${long}?${lat},${long}`;
}

module.exports.getCoordinates = getCoordinates;
module.exports.getSpeed = getSpeed;
module.exports.getDestination = getDestination;
module.exports.getArea = getArea;
module.exports.getETA = getETA;
module.exports.getAge = getAge;
module.exports.parseIP = parseIP;
module.exports.coordinatesToURL = coordinatesToURL;
