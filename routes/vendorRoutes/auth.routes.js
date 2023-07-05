const express = require("express");
const authRoutes = express.Router();
const cors = require("cors");

//controller
const authController = require("../../controller/vendor/vendor.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_franchise } = require("../../middleware/uploadImage");

//vendor registration
authRoutes.post(
  "/login",
  upload_franchise.none(),
  authController.vendorLogin
);

authRoutes.post(
  "/getprofile",
  verifyAdminToken,
  upload_franchise.none(),
  authController.getVendorProfile
);

authRoutes.put(
  "/editprofile",
  verifyAdminToken,
  upload_franchise.none(),
  authController.editVendorProfile
);

module.exports = authRoutes;
