const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const cron = require("node-cron");
// const moment = require("moment");
const upload = multer();
const mongoose = require("mongoose");
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting invoice folder as static folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static("views"));

// set template engine
app.set("views", "./views");

// defining folder for uploading the files/images/documents
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/views", express.static(path.join(__dirname, "views")));

//main Admin api
// const mainRoute = require("./routes/mainRoutes");
// app.use("/v1/kanavneelapi", mainRoute);

//test api
app.get("/", (req, res) => {
  res
    .status(200)
    .send(`<center><h1>💦💲Welcome to the kanavneel💲🚰</h1></center>`);
});
// console.log(process.env.MONGODB_CONNECTION_LIVE);

//connecting to database
mongoose.set("strictQuery", true);
mongoose
  .connect(
    // process.env.MONGODB_CONNECTION_LIVE,
    process.env.MONGODB_CONNECTION_ATLAS
  )
  .then(() => {
    console.log("The database was successfully connected.");
  })
  .catch(() => {
    console.log("Sorry, the database was not found!");
  });

// app.js main listner
app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});
