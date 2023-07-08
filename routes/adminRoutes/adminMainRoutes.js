// import libraries
const express = require("express");
const adminRoute = express.Router();
const cors = require("cors");

// importing routes
const adminRoutes = require("./auth.routes");
const planRoutes = require("./plan.routes");
const stateRoutes = require("./state.routes");
const distRoutes = require("./district.routes");
const cityRoutes = require("./city.routes");
const franchRoutes = require("./franchise.routes");
const custRoutes = require("./customer.routes");
const serveRoutes = require("./serviceman.routes");
const bookRoutes = require("./booking.routes");
const serviceRoutes = require("./service.routes");
const complaintRoutes = require("./complaint.routes");
const couponRoutes = require("./coupon.routes");
const paygatewayRoutes = require("./paymentGateway.routes");
const businessRoutes = require("./businessSetting.routes");
const settingRoutes = require("./setting.routes");
const faqRoutes = require("./faq.routes");
const bannerRoutes = require("./banner.routes");
const commonNotifRoutes = require("./commonNotification.routes");

/***************** Admin API ******************/
adminRoute.use("/auth", adminRoutes);

/***************** plan API ******************/
adminRoute.use("/plan", planRoutes);

/***************** state API ******************/
adminRoute.use("/state", stateRoutes);

/***************** district API ******************/
adminRoute.use("/district", distRoutes);

/***************** city API ******************/
adminRoute.use("/city", cityRoutes);

/***************** franchise API ******************/
adminRoute.use("/franchise", franchRoutes);

/***************** customer API ******************/
adminRoute.use("/customer", custRoutes);

/***************** serviceman API ******************/
adminRoute.use("/serviceman", serveRoutes);

/***************** booking API ******************/
adminRoute.use("/booking", bookRoutes);

/***************** service API ******************/
adminRoute.use("/service", serviceRoutes);

/***************** complaint API ******************/
adminRoute.use("/complaint", complaintRoutes);

/***************** coupon API ******************/
adminRoute.use("/coupon", couponRoutes);

/***************** paymentgateway API ******************/
adminRoute.use("/paymentgateway", paygatewayRoutes);

/***************** businesssetting API ******************/
adminRoute.use("/businesssetting", businessRoutes);

/***************** setting API ******************/
adminRoute.use("/setting", settingRoutes);

/***************** faq API ******************/
adminRoute.use("/faq", faqRoutes);

/***************** banner API ******************/
adminRoute.use("/banner", bannerRoutes);

/***************** commonnotification API ******************/
adminRoute.use("/commonnotification", commonNotifRoutes);

module.exports = adminRoute;
