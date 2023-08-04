const express = require("express");
const serviceRoutes = express.Router();
const cors = require("cors");

//controller
const serviceController = require("../../controller/admin/service.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
serviceRoutes.post(
  "/addservice",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.addService
);

serviceRoutes.post(
  "/getallpending",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.getAllPendingServices
);

serviceRoutes.post(
  "/getallaccepted",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.getAllAcceptedServices
);

serviceRoutes.post(
  "/getallcompleted",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.getAllCompletedServices
);

module.exports = serviceRoutes;
