// Module to parse the text from the VesselFinder page

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
  } else {
    let startIndex = text.indexOf("en route to") + 12;
    let endIndex = text.indexOf(",");
    destination = text.slice(startIndex, endIndex);
  }

  return destination;
}

function getSpeed(text) {
  let startIndex = text.indexOf("speed of") + 9;
  let endIndex = startIndex + 4;
  speed = text.slice(startIndex, endIndex);
  return speed;
}

function getETA(text) {
  let startIndex = text.indexOf("there on") + 9;
  let endIndex = startIndex + 13;
  eta = text.slice(startIndex, endIndex);
  return eta;
}

module.exports.getCoordinates = getCoordinates;
module.exports.getSpeed = getSpeed;
module.exports.getDestination = getDestination;
module.exports.getArea = getArea;
module.exports.getETA = getETA;
module.exports.getAge = getAge;
