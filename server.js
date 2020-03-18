const express = require("express");
const helmet = require("helmet");

const allowCrossDomain = require("./utils/cors");
const { serveStatic } = require("./utils/static");

const server = express();

server.use(helmet());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(allowCrossDomain);

server.all("*", (req, res, next) => {
  console.log(`${req.method}: ${req.originalUrl}`);
  next();
});

// Serve static files
server.use("/", (req, res, next) => serveStatic(req, res, next, "skyblazar"));

const skyblazar = require("./routes/skyblazar");
const soccerVs = require("./routes/soccer-vs");

server.use("/soccer-vs", soccerVs);
server.use("/", skyblazar);

server.get("*", (_, res) => {
  res.status(404).json({
    message: "Does not exist"
  });
});

server.listen(process.env.PORT || 4000, () =>
  console.log(`Server listening on port: ${process.env.PORT || 4000}`)
);
