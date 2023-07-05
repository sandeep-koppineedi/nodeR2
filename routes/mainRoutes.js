const adminRoute = require("./adminRoutes/adminMainRoutes");
const appRoute = require("./appRoutes/appMainRoutes");
const vendorRoute = require("./vendorRoutes/vendorMainRoutes");

const mainRoute = require("express").Router();

// admin panel other management
mainRoute.use("/admin", adminRoute);

// vendor panel management;
mainRoute.use("/vendor", vendorRoute);

// mainRoute.use("/webapp", websiteRoute);
mainRoute.use("/app", appRoute);

module.exports = mainRoute;
