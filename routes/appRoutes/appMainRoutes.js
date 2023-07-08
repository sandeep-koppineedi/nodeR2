// import libraries
const express = require("express");
const appRoute = express.Router();
const cors = require("cors");

// importing routes
// const homeRoutes = require("./home.routes");
const custRoutes = require("./customer.routes");
const settingRoutes = require("./setting.routes");
const planPurchaseRoutes = require("./planPurchase.routes");

/***************** Customer API ******************/
appRoute.use("/auth", custRoutes);

/***************** setting API ******************/
appRoute.use("/setting", settingRoutes);

/***************** purchaseplan API ******************/
appRoute.use("/purchaseplan", planPurchaseRoutes);

module.exports = appRoute;
