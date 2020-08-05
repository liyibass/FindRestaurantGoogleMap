const express = require("express");
const router = express.Router();
const axios = require("axios");
const queryString = require("query-string");

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

router.get("/:searchField", async (req, res) => {
  const apiKey = process.env.GOOGLE_MAP_API_KEY;

  let data = queryString.parse(req.params.searchField);
  data.type = encodeURI(data.type); //中文轉碼

  console.log(data);

  try {
    const { type, radius } = data;
    const location = `${data.lat},${data.lng}`;
    const fields =
      "name,geometry,formatted_address,business_status,types,photos";

    axios
      .get(
        `    https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${type}&inputtype=textquery&fields=${fields}&location=${location}&radius=${radius}&language=zh-TW&key=${apiKey}`
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
