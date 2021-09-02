const mongoose = require("mongoose");
const {dbURL} = require("./config");

mongoose.connect(dbURL)
  .then(() => debug("Connected to MongoDB"))
  .catch(err => debug("Could not connect to MongoDB", err))

const shipSchema = new mongoose.Schema({
  name: String,
  imo: Number,
  area: {type: String, default: "Unavailable" },
  coordinates: {type: String, default: "Unavailable" },
  speed: {type: Number, default: 0},
  destination: {type: String, default: "Unavailable" },
  eta: {type: String, default: "Unavailable" },
  dataAge: {type: String, default: "Not updated" },
  windNow: {type: Number, default: 0},
  wind6H: {type: Number, default: 0}
});

const Ship = mongoose.model("Ship", shipSchema);

const ship = new Ship({
  name: "Maersk Whatever",
  imo: 123456789,
  area: "",
  coordinates: "",
  speed: 0,
  destination: "",
  eta
});