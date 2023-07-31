const express = require("express");
const authRoutes = express.Router();
const cors = require("cors");

//controller
const authController = require("../../controller/vendor/vendor.controller");
const dashController = require("../../controller/vendor/dashboard.controller");

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

authRoutes.put(
  "/editcompanyimg",
  verifyAdminToken,
  upload_franchise.single("companyIdImage"),
  authController.editCompanyidImage
);

authRoutes.put(
  "/editcompanylogo",
  verifyAdminToken,
  upload_franchise.single("companyLogo"),
  authController.editVendorLogo
);

authRoutes.put(
  "/changepassword",
  verifyAdminToken,
  upload_franchise.none(),
  authController.changeVendorPassword
);


// /************* DASHBOARD **********/
authRoutes.post(
  "/getdashboard",
  verifyAdminToken,
  upload_franchise.none(),
  dashController.getDashboard
);

module.exports = authRoutes;
