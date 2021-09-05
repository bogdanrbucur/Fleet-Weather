// Middleware to check if user has permission to modify users in db
// Load after auth

module.exports = function (req, res, next) {
  if (!req.user.canModifyUsers) return res.status(403).send("Access denined."); // 403 Forbidden (Don't have required privilages)

  next(); // if user has permission, continue with the route handler
};
