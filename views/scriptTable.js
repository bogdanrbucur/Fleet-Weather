const Http = new XMLHttpRequest(); // new object for AJAX magic
const url = "http://bucurbr.go.ro:3000/api/getships"; // endpoint to get updated ship info

const shiplistDiv = document.querySelector("div.shiplist"); // Find the shiplist div in pug

const intervalToUpdateShipInfo = 1; // minutes within which to update all ships
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
  "Current wind",
  "Wind in 6H",
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
  // let shipWind = document.createElement("td");
  // shipWind.innerText = ship.wind;
  // let shipWind6H = document.createElement("td");
  // shipWind6H.innerText = ship.shipWind6H;

  shiplistTableBodyRow.append(
    shipName,
    shipIMO,
    shipArea,
    shipCoordinates,
    shipDestination,
    shipSpeed,
    shipETA,
    shipDataAge
  ); // Append all cells to the table row
  shiplistTable.append(shiplistTableBodyRow); // Append the current row to the scoreboard table body
}

// HTTP GET method to update ships data
function getShipsUpdate() {
  Http.open("GET", url);
  Http.setRequestHeader("Access-Control-Allow-Headers", "Accept");
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
