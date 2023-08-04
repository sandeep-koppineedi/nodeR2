const express = require("express");
const serviceRatingRoutes = express.Router();
const cors = require("cors");

//controller
const serviceController = require("../../controller/admin/servicemanRating.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
serviceRatingRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.getAllServicemanRatings
);

module.exports = serviceRatingRoutes;
