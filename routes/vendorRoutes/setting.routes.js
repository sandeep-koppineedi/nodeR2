const express = require("express");
const settingRoutes = express.Router();
const cors = require("cors");

//controller
const settingController = require("../../controller/admin/setting.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
settingRoutes.post(
  "/getsetting",
  verifyAdminToken,
  upload_profileImg.none(),
  settingController.getSetting
);

module.exports = settingRoutes;
