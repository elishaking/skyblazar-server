const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(helmet());

const soccerVs = require("./routes/soccer-vs");
server.use("/soccer-vs", soccerVs);

server.get("*", (_, res) => {
  res.status(404).json({
    message: "Does not exist"
  });
});

server.listen(process.env.PORT || 3000);
