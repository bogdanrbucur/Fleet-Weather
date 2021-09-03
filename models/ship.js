// Mongoose model for Ships in MongoDB

const mongoose = require("../mongodb/connect"); // get the object created when connecting to MongoDB

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true, trim: true },
  imo: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v && v.toString().length === 7; // if v has a value and length of 7, validate it
      },
      message: "IMO Number should be 7 digits.",
    },
  },
  area: { type: String, default: "Unavailable" },
  coordinates: { type: String, default: "Unavailable" },
  speed: { type: Number, default: 0 },
  destination: { type: String, default: "Unavailable" },
  eta: { type: String, default: "Unavailable" },
  dataAge: { type: String, default: "Not updated" },
  windNow: { type: Number, default: 0 },
  wind6H: { type: Number, default: 0 },
});

const Ship = mongoose.model("Ship", shipSchema);

module.exports = Ship;