// import libraries
const express = require("express");
const servicemanAppRoute = express.Router();
const cors = require("cors");

// importing routes
// const homeRoutes = require("./home.routes");
const servicemanRoutes = require("./serviceman.routes");
const settingRoutes = require("./setting.routes");
const serviceRoutes = require("./service.routes");

/***************** auth API ******************/
servicemanAppRoute.use("/auth", servicemanRoutes);

/***************** setting API ******************/
servicemanAppRoute.use("/setting", settingRoutes);

/***************** service API ******************/
servicemanAppRoute.use("/service", serviceRoutes);

module.exports = servicemanAppRoute;
