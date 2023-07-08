const express = require("express");
const planPurchaseRoutes = express.Router();
const cors = require("cors");

//controller
const purchaseController = require("../../controller/app/purchasePlan.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
planPurchaseRoutes.post(
  "/purchase",
  verifyAdminToken,
  upload_profileImg.none(),
  purchaseController.addPurchase
);

planPurchaseRoutes.post(
  "/getallpurchase",
  verifyAdminToken,
  upload_profileImg.none(),
  purchaseController.getAllPurchases
);

module.exports = planPurchaseRoutes;
