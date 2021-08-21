function getSeaArea() {}

function getCoordinates(text) {
  let startIndex = text.indexOf("coordinates") + 12;
  let endIndex = startIndex + 23;
  coordinates = text.slice(startIndex, endIndex);
  return coordinates;
}

function getAge() {}

function getDestination() {}

function getSpeed() {}

function getETA() {}

module.exports.getCoordinates = getCoordinates;
