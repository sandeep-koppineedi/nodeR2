const express = require("express");
const couponRoutes = express.Router();
const cors = require("cors");

//controller
const couponController = require("../../controller/admin/coupon.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
couponRoutes.post(
  "/addcpn",
  verifyAdminToken,
  upload_profileImg.none(),
  couponController.addCoupon
);

couponRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  couponController.getAllCoupons
);

couponRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_profileImg.none(),
  couponController.getCouponDetails
);

couponRoutes.put(
  "/editcpn/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  couponController.editCoupon
);

couponRoutes.delete(
  "/deletecpn/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  couponController.removeCoupon
);


module.exports = couponRoutes;
