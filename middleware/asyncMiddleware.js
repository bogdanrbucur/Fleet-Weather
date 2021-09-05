// Middleware to wrap all route handlers in try-catch blocks
// Call it in the route handlers with the route handlers as parameter
// Obsolete with express-async-errors

module.exports = function asyncMiddleware(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
