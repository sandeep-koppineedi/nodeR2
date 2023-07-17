const express = require("express");
const reportRoutes = express.Router();
const cors = require("cors");

//controller
const reportController = require("../../controller/admin/report.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
reportRoutes.post(
  "/servicemanreport",
  verifyAdminToken,
  reportController.servicemanReport
);

reportRoutes.post(
  "/customerreport",
  verifyAdminToken,
  // upload_profileImg.none(),
  reportController.customerReport
);

reportRoutes.post(
  "/franchisereport",
  verifyAdminToken,
  // upload_profileImg.none(),
  reportController.franchiseReport
);

reportRoutes.post(
  "/servicereport",
  verifyAdminToken,
  // upload_profileImg.none(),
  reportController.serviceReport
);

reportRoutes.post(
  "/bookingreport",
  verifyAdminToken,
  // upload_profileImg.none(),
  reportController.bookingReport
);

module.exports = reportRoutes;
