const express = require("express");
const businessRoutes = express.Router();
const cors = require("cors");

//controller
const businessController = require("../../controller/admin/businessSetting.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_businesSetting } = require("../../middleware/uploadImage");

//admin registration
businessRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_businesSetting.none(),
  businessController.getBusinessSetting
);

businessRoutes.put(
  "/edit",
  verifyAdminToken,
  upload_businesSetting.single("companyLogo"),
  businessController.editBusinessSetting
);

module.exports = businessRoutes;
