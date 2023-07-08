const express = require("express");
const serviceRoutes = express.Router();
const cors = require("cors");

//controller
const serviceController = require("../../controller/vendor/service.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
serviceRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.getAllServices
);

serviceRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.getService
);

serviceRoutes.put(
  "/updatestatus/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.editServiceStatus
);

serviceRoutes.put(
  "/assignbooking/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.assignService
);

module.exports = serviceRoutes;
