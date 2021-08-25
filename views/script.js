(function () {
  alert("I am here");
})();

var ships = JSON.parse(JSON.stringify(ships));

tableView = document.getElementById("tableView");

tableView.innerHTML = "ships";
