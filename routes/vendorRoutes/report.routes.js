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
  "/servicereport",
  verifyAdminToken,
  reportController.serviceReport
);

module.exports = reportRoutes;
