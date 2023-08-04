const express = require("express");
const serviceRatingRoutes = express.Router();
const cors = require("cors");

//controller
const serviceController = require("../../controller/app/servicemanRating.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
serviceRatingRoutes.post(
  "/addrating",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.addService
);

module.exports = serviceRatingRoutes;
