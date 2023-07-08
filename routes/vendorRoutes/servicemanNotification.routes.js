const express = require("express");
const servicemanNotifRoutes = express.Router();
const cors = require("cors");

//controller
const commonNotifController = require("../../controller/vendor/servicemanNotification.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
servicemanNotifRoutes.post(
  "/addnotification",
  verifyAdminToken,
  upload_profileImg.none(),
  commonNotifController.createNotification
);

servicemanNotifRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  commonNotifController.getAllNotifications
);

servicemanNotifRoutes.delete(
  "/delete/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  commonNotifController.deleteNotification
);

module.exports = servicemanNotifRoutes;
