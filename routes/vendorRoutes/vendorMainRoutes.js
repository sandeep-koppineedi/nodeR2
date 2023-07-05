// import libraries
const express = require("express");
const vendorRoute = express.Router();
const cors = require("cors");

// importing routes
// const homeRoutes = require("./home.routes");
const authRoutes = require("./auth.routes");

/***************** vendor auth API ******************/
vendorRoute.use("/auth", authRoutes);


module.exports = vendorRoute;
