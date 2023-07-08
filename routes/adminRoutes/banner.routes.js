const express = require("express");
const bannerRoutes = express.Router();
const cors = require("cors");

//controller
const bannerController = require("../../controller/admin/banner.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_bannerImg } = require("../../middleware/uploadImage");

//admin registration
bannerRoutes.post(
  "/addbanner",
  verifyAdminToken,
  upload_bannerImg.single("bannerMedia"),
  bannerController.addBanner
);

bannerRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_bannerImg.none(),
  bannerController.getAllBanner
);

bannerRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_bannerImg.none(),
  bannerController.getBannerDetails
);

bannerRoutes.put(
  "/editbanner/:id",
  verifyAdminToken,
  upload_bannerImg.single("bannerMedia"),
  bannerController.editBanner
);

bannerRoutes.delete(
  "/deletebanner/:id",
  verifyAdminToken,
  upload_bannerImg.none(),
  bannerController.deleteBanner
);

module.exports = bannerRoutes;
