const Http = new XMLHttpRequest(); // new object for AJAX magic
const { updateEndpoint } = require("../config"); // endpoint to get updated ship info
// const updateEndpoint = "http://bucurbr.go.ro:3000/api/getships";

const shiplistDiv = document.querySelector("div.shiplist"); // Find the shiplist div in pug

const intervalToUpdateShipInfo = 5; // minutes within which to update all ships
const interval = intervalToUpdateShipInfo * 60 * 1000;

let timeOfUpdate = new Date();

setInterval(function () {
  getShipsUpdate();
}, interval);

// Every 30 seconds update the "Updated x ago"
setInterval(function () {
  document.getElementById("updated-time").innerHTML =
    "Updated " + moment(timeOfUpdate).fromNow();
}, 30000);

let tableHeaders = [
  "Ship Name",
  "IMO Number",
  "Location",
  "Coordinates",
  "Destination",
  "Speed",
  "ETA",
  "Data age",
  "Current wind [Kts]",
  "Wind in 6H [Kts]",
];

function createShiplistTable() {
  while (shiplistDiv.firstChild)
    shiplistDiv.removeChild(shiplistDiv.firstChild); // Remove all children from scoreboard div (if any)

  let shiplistTable = document.createElement("table"); // Create the table itself.
  shiplistTable.className = "table"; // Class name as per Bootstrap
  shiplistTable.id = "shiplistTable";

  let shiplistTableHead = document.createElement("thead"); // Creates the table header group element
  shiplistTableHead.id = "shiplistTableHead";

  let shiplistTableHeaderRow = document.createElement("tr"); // Creates the row that will contain the headers
  shiplistTableHeaderRow.id = "shiplistTableHeaderRow";

  // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
  tableHeaders.forEach((header) => {
    let shiplistHeader = document.createElement("th"); // Creates the current header cell during a specific iteration
    shiplistHeader.innerText = header;
    shiplistHeader.setAttribute("scope", "col"); // For Bootstrap
    shiplistTableHeaderRow.append(shiplistHeader); // Appends the current header cell to the header row
  });
  shiplistTableHead.append(shiplistTableHeaderRow); // Appends the header row to the table header group element
  shiplistTable.append(shiplistTableHead);

  let shiplistTableBody = document.createElement("tbody"); // Creates the table body group element
  shiplistTableBody.id = "shiplistTable-Body";
  shiplistTable.append(shiplistTableBody); // Appends the table body group element to the table
  shiplistDiv.append(shiplistTable); // Appends the table to the shiplist div
}
// Function below appends each ship row with its cells
function appendShips(ship) {
  const shiplistTable = document.querySelector(".table"); // Find the table we created
  let shiplistTableBodyRow = document.createElement("tr"); // Create the current table row
  shiplistTableBodyRow.id = "shiplistTableBodyRow";

  // Below lines create the column cells that will be appended to the current table row
  let shipName = document.createElement("th");
  shipName.innerText = ship.name;
  shipName.setAttribute("scope", "row"); // For Bootstrap
  let shipIMO = document.createElement("td");
  shipIMO.innerText = ship.imo;
  let shipArea = document.createElement("td");
  shipArea.innerText = ship.area;
  let shipCoordinates = document.createElement("td");
  shipCoordinates.innerText = ship.coordinates;
  let shipDestination = document.createElement("td");
  shipDestination.innerText = ship.destination;
  let shipSpeed = document.createElement("td");
  shipSpeed.innerHTML = ship.speed;
  let shipETA = document.createElement("td");
  shipETA.innerText = ship.eta;
  let shipDataAge = document.createElement("td");
  shipDataAge.innerText = ship.dataAge;

  // Weather data and conditional formatting
  // Wind now
  let shipWindNow = document.createElement("td");
  // Make a circle in the table cell
  let shipWindNowCircle = document.createElement("span");
  shipWindNowCircle.className = "WindCircle";
  shipWindNowCircle.innerText = ship.windNow;
  shipWindNow.append(shipWindNowCircle);

  // Circle conditional formatting
  if (ship.windNow <= 16) shipWindNowCircle.id = "CircleGreen";
  else if (ship.windNow <= 27) shipWindNowCircle.id = "CircleYellow";
  else if (ship.windNow <= 40) shipWindNowCircle.id = "CircleOrange";
  else if (ship.windNow <= 50) shipWindNowCircle.id = "CircleRed";
  else shipWindNowCircle.id = "CirclePurple";

  // Wind in 6 hours
  let shipWind6H = document.createElement("td");
  // Make a circle in the table cell
  let shipWind6HCircle = document.createElement("span");
  shipWind6HCircle.className = "WindCircle";
  shipWind6HCircle.innerText = ship.wind6H;
  shipWind6H.append(shipWind6HCircle);

  // Circle conditional formatting
  if (ship.shipWind6H <= 16) shipWind6HCircle.id = "CircleGreen";
  else if (ship.wind6H <= 27) shipWind6HCircle.id = "CircleYellow";
  else if (ship.wind6H <= 40) shipWind6HCircle.id = "CircleOrange";
  else if (ship.wind6H <= 50) shipWind6HCircle.id = "CircleRed";
  else shipWind6HCircle.id = "CirclePurple";

  // Append all data to row
  shiplistTableBodyRow.append(
    shipName,
    shipIMO,
    shipArea,
    shipCoordinates,
    shipDestination,
    shipSpeed,
    shipETA,
    shipDataAge,
    shipWindNow,
    shipWind6H
  ); // Append all cells to the table row
  shiplistTable.append(shiplistTableBodyRow); // Append the current row to the scoreboard table body
}

// HTTP GET method to update ships data
function getShipsUpdate() {
  Http.open("GET", updateEndpoint);
  Http.send();

  Http.onreadystatechange = function () {
    if (this.readyState == 4) {
      ships = JSON.parse(Http.responseText);
      createShiplistTable(); // Clears scoreboard div if it has any children nodes, creates & appends the table
      // Iterates through all the objects in the ships array and appends each one to the table body
      for (const ship of ships) {
        appendShips(ship); // Creates and appends each row to the table body
      }
      timeOfUpdate = new Date();
      document.getElementById("updated-time").innerHTML =
        "Updated " + moment(timeOfUpdate).fromNow(); // Refresh the "Updated x ago"
    }
  };

  Http.send(null);
}
