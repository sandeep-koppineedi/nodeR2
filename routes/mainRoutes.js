const adminRoute = require("./adminRoutes/adminMainRoutes");
const appRoute = require("./appRoutes/appMainRoutes");
const servicemanAppRoute = require("./servicemanRoutes/servicemanMainRoutes");
const vendorRoute = require("./vendorRoutes/vendorMainRoutes");

const mainRoute = require("express").Router();

// admin panel other management
mainRoute.use("/admin", adminRoute);

// vendor panel management;
mainRoute.use("/vendor", vendorRoute);

// Customer App management
mainRoute.use("/app", appRoute);

// serviceman App management
mainRoute.use("/servicemanApp", servicemanAppRoute);

module.exports = mainRoute;
