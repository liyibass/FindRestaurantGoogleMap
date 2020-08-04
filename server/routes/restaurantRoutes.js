const express = require("express");
const router = express.Router();
const axios = require("axios");
const { google } = require("googleapis");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");

router.get("/", async (req, res) => {
  try {
    res.render("index", {
      title: "Express App",
      message: "Use url to fetch restaurant data:",
      apiKey: process.env.GOOGLE_MAP_API_KEY,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/restaurant/", async (req, res) => {
  const apiKey = process.env.GOOGLE_MAP_API_KEY;
  try {
    const search = "restaurant";

    const location = `24.953881,121.225525`;
    const radius = "2000";

    const fields =
      "name,geometry,formatted_address,business_status,types,photos";

    axios
      .get(
        `    https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${search}&inputtype=textquery&fields=${fields}&location=${location}&radius=${radius}&language=zh-TW&key=${apiKey}`
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
