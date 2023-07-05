const express = require("express");
const paygatewayRoutes = express.Router();
const cors = require("cors");

//controller
const payGatewayController = require("../../controller/admin/paymentGateway.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
paygatewayRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_profileImg.none(),
  payGatewayController.getpaymentGateway
);

paygatewayRoutes.put(
  "/edit",
  verifyAdminToken,
  upload_profileImg.none(),
  payGatewayController.editpaymentGateway
);

module.exports = paygatewayRoutes;
