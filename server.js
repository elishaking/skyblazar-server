const express = require("express");
const helmet = require("helmet");
const allowCrossDomain = require("./utils/cors");

const server = express();

server.use(helmet());
server.use(allowCrossDomain);

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
