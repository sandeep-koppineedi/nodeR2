const express = require("express");
const distRoutes = express.Router();
const cors = require("cors");

//controller
const distController = require("../../controller/admin/district.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
distRoutes.post(
  "/getalldropdown",
  upload_profileImg.none(),
  distController.getAllDistrictByState
);

module.exports = distRoutes;
