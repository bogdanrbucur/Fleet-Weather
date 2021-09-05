// Mongoose model for Users in MongoDB

const mongoose = require("../mongodb/connect"); // get the object created when connecting to MongoDB
const Joi = require("joi");
const debug = require("debug")("app:model-user");
const jwt = require("jsonwebtoken");
const { jwtAuthKey } = require("../config");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  canModifyShips: Boolean,
  canModifyUsers: Boolean,
});

// Add method to generate jwt auth token containing user id, and its permissions
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      canModifyShips: this.canModifyShips,
      canModifyUsers: this.canModifyUsers,
    },
    jwtAuthKey
  );
};

const User = mongoose.model("User", userSchema);

// Joi function to validate a Ship input
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
