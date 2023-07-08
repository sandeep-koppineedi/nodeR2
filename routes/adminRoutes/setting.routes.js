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

settingRoutes.put(
  "/editabout",
  verifyAdminToken,
  upload_profileImg.none(),
  settingController.updateAboutUs
);

settingRoutes.put(
  "/edittermscond",
  verifyAdminToken,
  upload_profileImg.none(),
  settingController.updateTermsCondition
);

settingRoutes.put(
  "/editprivacypolicy",
  verifyAdminToken,
  upload_profileImg.none(),
  settingController.updatePrivacyPolicy
);

settingRoutes.put(
  "/editrefundpolicy",
  verifyAdminToken,
  upload_profileImg.none(),
  settingController.updateRefundPolicy
);


module.exports = settingRoutes;
