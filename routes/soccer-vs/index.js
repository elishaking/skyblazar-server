const router = require("express").Router();
const axios = require("axios").default;

const url = "https://www.easports.com/fifa/ultimate-team/api/fut";

router.get("/", (req, res) => {
  res.json({
    success: true
  });
});

router.get("/api/:name", (req, res) => {
  const playerName = req.params.name;
  axios
    .get(`${url}/item?name=${playerName}`)
    .then(axiosRes => {
      const players = axiosRes.data.items;

      res.status(200).json({
        success: true,
        message: "Player Retrieved",
        data: players[0]
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
});

module.exports = router;
