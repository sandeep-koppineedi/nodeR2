const express = require("express");
const serviceRoutes = express.Router();
const cors = require("cors");

//controller
const serviceController = require("../../controller/servicemanApp/service.controller");
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

serviceRoutes.put(
  "/changeongoingbooking/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.ongoingService
);

serviceRoutes.put(
  "/changecompletedbooking/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.completedService
);

serviceRoutes.put(
  "/changecanceledbooking/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.cancelService
);

module.exports = serviceRoutes;
