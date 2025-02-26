const express = require("express");
const commonNotifRoutes = express.Router();
const cors = require("cors");

//controller
const commonNotifController = require("../../controller/admin/commonNotification.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_commonNotification } = require("../../middleware/uploadImage");

//admin registration
commonNotifRoutes.post(
  "/addnotification",
  verifyAdminToken,
  upload_commonNotification.single("notifImg"),
  commonNotifController.createNotification
);

commonNotifRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_commonNotification.none(),
  commonNotifController.getAllNotifications
);

commonNotifRoutes.delete(
  "/delete/:id",
  verifyAdminToken,
  upload_commonNotification.none(),
  commonNotifController.deleteNotification
);

module.exports = commonNotifRoutes;
