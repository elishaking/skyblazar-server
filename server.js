const express = require("express");
const helmet = require("helmet");

const allowCrossDomain = require("./utils/cors");
const { serveStatic } = require("./utils/static");

const server = express();

server.use(helmet());
server.use(allowCrossDomain);

// Serve static files
server.use("/", (req, res, next) => serveStatic(req, res, next, "skyblazar"));

const skyblazar = require("./routes/skyblazar");
const soccerVs = require("./routes/soccer-vs");

server.use("/", skyblazar);
server.use("/soccer-vs", soccerVs);

server.get("*", (_, res) => {
  res.status(404).json({
    message: "Does not exist"
  });
});

server.listen(process.env.PORT || 4000);
