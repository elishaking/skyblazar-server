const path = require("path");

/**
 * Serve static files
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} route
 */
function serveStatic(req, res, next, route) {
  if (checkFile(req.originalUrl))
    res.sendFile(
      path.join(
        path.dirname(__dirname),
        "routes",
        route,
        "assets",
        req.originalUrl
      )
    );
  else next();
}

/**
 * Check File Type
 *
 * @param {string} url
 */
function checkFile(url) {
  return (
    url.indexOf(".css") != -1 ||
    url.indexOf(".svg") != -1 ||
    url.indexOf(".png") != -1 ||
    url.indexOf(".js") != -1 ||
    url.indexOf(".jpg") != -1 ||
    url.indexOf(".gif") != -1 ||
    url.indexOf(".txt") != -1 ||
    url.indexOf(".xml") != -1 ||
    url.indexOf(".ttf") != -1 ||
    url.indexOf(".woff") != -1 ||
    url.indexOf(".woff2") != -1
  );
}

module.exports = { serveStatic };
