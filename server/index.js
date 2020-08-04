const express = require("express");
const app = express();

require("dotenv/config");

app.set("view engine", "ejs");
app.set("views", "./views");

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const homeRouter = require("./routes/homeRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

app.use("/", homeRouter);
app.use("/search", restaurantRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
