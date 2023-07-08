const express = require("express");
const custRoutes = express.Router();
const cors = require("cors");

//controller
const custController = require("../../controller/vendor/customer.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
custRoutes.post(
  "/addcustomer",
  verifyAdminToken,
  upload_profileImg.single("profilePic"),
  custController.addCustomer
);

custRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  custController.getAllCustomeres
);

custRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_profileImg.none(),
  custController.getCustomer
);

custRoutes.put(
  "/edit/:id",
  verifyAdminToken,
  upload_profileImg.single("profilePic"),
  custController.editCustomer
);

custRoutes.put(
  "/delete/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  custController.changeCustomerAsDelete
);

module.exports = custRoutes;
