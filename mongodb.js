const mongoose = require("mongoose");
const {dbURL} = require("./config");

mongoose.connect(dbURL)
  .then(() => debug("Connected to MongoDB"))
  .catch(err => debug("Could not connect to MongoDB", err))

const shipSchema = new mongoose.Schema({
  name: String,
  imo: Number,
  area: String,
  coordinates: String,
  speed: Number,
  destination: String,
  eta: String,
  dataAge: String,
  windNow: Number,
  wind6H: Number
});

const Ship = mongoose.model("Ship", shipSchema);