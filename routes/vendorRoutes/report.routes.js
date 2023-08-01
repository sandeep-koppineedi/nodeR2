const express = require("express");
const reportRoutes = express.Router();
const cors = require("cors");

//controller
const reportController = require("../../controller/vendor/report.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
reportRoutes.post(
  "/bookingreport",
  verifyAdminToken,
  reportController.bookingReport
);

reportRoutes.post(
  "/bookingexpiringreport",
  verifyAdminToken,
  reportController.bookingExpiringReport
);

reportRoutes.post(
  "/bookingexpiredreport",
  verifyAdminToken,
  reportController.bookingExpiredReport
);

reportRoutes.post(
  "/servicereport",
  verifyAdminToken,
  reportController.serviceReport
);

reportRoutes.post(
  "/customerreport",
  verifyAdminToken,
  reportController.customerReport
);

reportRoutes.post(
  "/servicemanreport",
  verifyAdminToken,
  reportController.servicemanReport
);

module.exports = reportRoutes;
