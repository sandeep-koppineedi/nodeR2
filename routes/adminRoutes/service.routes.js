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
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  serviceController.getAllServices
);


module.exports = serviceRoutes;
