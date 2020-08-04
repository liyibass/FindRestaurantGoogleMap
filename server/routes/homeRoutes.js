const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //   res.send("Hello world");

  res.render("index", {
    title: "Express App",
    message: "Use url to fetch restaurant data:",
    apiKey: process.env.GOOGLE_MAP_API_KEY,
  });
});

module.exports = router;
