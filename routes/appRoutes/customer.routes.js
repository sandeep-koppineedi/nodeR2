const express = require("express");
const custRoutes = express.Router();
const cors = require("cors");

//controller
const custController = require("../../controller/app/customer.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
custRoutes.post(
  "/signup",
  upload_profileImg.single("profilePic"),
  custController.customerRegisteration
);

custRoutes.post(
  "/login",
  upload_profileImg.none(),
  custController.customerLogin
);

custRoutes.post(
  "/getprofile",
  verifyAdminToken,
  upload_profileImg.none(),
  custController.getCustomerProfile
);

custRoutes.put(
  "/edit",
  verifyAdminToken,
  upload_profileImg.none(),
  custController.editCustomerProfile
);

custRoutes.put(
  "/editprofileimg",
  verifyAdminToken,
  upload_profileImg.single("profilePic"),
  custController.editProfileImage
);

custRoutes.put(
  "/changepassword",
  verifyAdminToken,
  upload_profileImg.none(),
  custController.changeCustomerPassword
);

module.exports = custRoutes;
