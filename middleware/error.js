// Middleware to handle errors/exceptions

module.exports = function (err, req, res, next) {
  res.status(500).send("Something failed.");
};
