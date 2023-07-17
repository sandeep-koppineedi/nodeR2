// import libraries
const express = require("express");
const vendorRoute = express.Router();
const cors = require("cors");

// importing routes
// const homeRoutes = require("./home.routes");
const authRoutes = require("./auth.routes");
const serveRoutes = require("./serviceman.routes");
const custRoutes = require("./customer.routes");
const complaintRoutes = require("./complaint.routes");
const bookRoutes = require("./booking.routes");
const serviceRoutes = require("./service.routes");
const stateRoutes = require("./state.routes");
const distRoutes = require("./district.routes");
const cityRoutes = require("./city.routes");
const settingRoutes = require("./setting.routes");
const faqRoutes = require("./faq.routes");
const servicemanNotifRoutes = require("./servicemanNotification.routes");
const reportRoutes = require("./report.routes");

/***************** vendor auth API ******************/
vendorRoute.use("/auth", authRoutes);

/***************** serviceman API ******************/
vendorRoute.use("/serviceman", serveRoutes);

/***************** customer API ******************/
vendorRoute.use("/customer", custRoutes);

/***************** complaintbox API ******************/
vendorRoute.use("/complaintbox", complaintRoutes);

/***************** booking API ******************/
vendorRoute.use("/booking", bookRoutes);

/***************** service API ******************/
vendorRoute.use("/service", serviceRoutes);

/***************** state API ******************/
vendorRoute.use("/state", stateRoutes);

/***************** district API ******************/
vendorRoute.use("/district", distRoutes);

/***************** city API ******************/
vendorRoute.use("/city", cityRoutes);

/***************** setting API ******************/
vendorRoute.use("/setting", settingRoutes);

/***************** faq API ******************/
vendorRoute.use("/faq", faqRoutes);

/***************** servicemanNotification API ******************/
vendorRoute.use("/servicemanNotification", servicemanNotifRoutes);

/***************** report API ******************/
vendorRoute.use("/report", reportRoutes);

module.exports = vendorRoute;
