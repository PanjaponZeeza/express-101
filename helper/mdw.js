/**
 * Middleware function to log incoming requests.
 * Logs the HTTP method and the original URL of the request along with a timestamp.
 *
 * @type {import('express').RequestHandler}
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
function reqLogger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] Request: ${req.method} ${req.hostname}${
      req.url
    }`
  );
  next();
}

module.exports = reqLogger;
