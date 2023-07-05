const express = require("express");
const adminRoutes = express.Router();
const cors = require("cors");

//controller
const adminController = require("../../controller/admin/admin.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
adminRoutes.post(
  "/adminregistration",
  upload_profileImg.none(),
  adminController.adminRegisteration
);

adminRoutes.post(
  "/login",
  upload_profileImg.none(),
  adminController.adminLogin
);

adminRoutes.post(
  "/getprofile",
  verifyAdminToken,
  upload_profileImg.none(),
  adminController.getAdminProfile
);

adminRoutes.put(
  "/updateprofile",
  verifyAdminToken,
  upload_profileImg.none(),
  adminController.editAdminProfile
);

adminRoutes.put(
  "/updateprofileimage",
  verifyAdminToken,
  upload_profileImg.single("profilePic"),
  adminController.editAdminProfileImage
);

adminRoutes.put(
  "/changepass",
  verifyAdminToken,
  upload_profileImg.none(),
  adminController.changeAdminPassword
);

// // /******************* FORGOT PASSWORD ************/
adminRoutes.post(
  "/sendotpemail",
  upload_profileImg.none(),
  adminController.generateOtp
);

adminRoutes.post(
  "/compareotp",
  upload_profileImg.none(),
  adminController.compareOtp
);

adminRoutes.post(
  "/resetpassword",
  upload_profileImg.none(),
  adminController.resetPassword
);

// /************* DASHBOARD **********/
// adminRoutes.post(
//   "/getdashboard",
//   verifyAdminToken,
//   upload_profileImg.none(),
//   dashController.getDashboardItems
// );

module.exports = adminRoutes;
