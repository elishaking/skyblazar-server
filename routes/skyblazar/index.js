const router = require('express').Router();
const path = require('path');
const { sendProjectEmail } = require('./email');

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/articles", (req, res) => {
  res.sendFile(path.join(__dirname, "articles.html"));
});

router.get("/articles/:article", (req, res) => {
  res.sendFile(path.join(__dirname, "articles", `${req.params.article}.html`));
});

router.post("/project", (req, res) => {
  sendProjectEmail(req.body)
    .then((sent) => {
      if (sent) return res.json({ success: true });

      res.json({ success: false });
    });
});

module.exports = router;