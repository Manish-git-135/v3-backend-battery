const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// connect to mongoDB
require("./initDB")();

// Import Routes
const getBatteryRoute = require("./routes/batteryGet");
const postBatteryRoute = require("./routes/batteryPost");

app.use("/detials", getBatteryRoute);
app.use("/uploads", postBatteryRoute);

//base url
app.get("/", (req, res) => {
  res.send("What you want to know");
});

// wrong end point error handling
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

PORT = process.env.PORT || 8600;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
