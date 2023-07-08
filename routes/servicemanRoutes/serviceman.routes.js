const express = require("express");
const servicemanRoutes = express.Router();
const cors = require("cors");

//controller
const serveController = require("../../controller/servicemanApp/serviceman.controller");
const homeController = require("../../controller/servicemanApp/homePage.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_serviceman } = require("../../middleware/uploadImage");

//admin registration
servicemanRoutes.post(
  "/signup",
  upload_serviceman.single("profilePic"),
  serveController.servicemanRegisteration
);

servicemanRoutes.post(
  "/login",
  upload_serviceman.none(),
  serveController.servicemanLogin
);

servicemanRoutes.post(
  "/getprofile",
  verifyAdminToken,
  upload_serviceman.none(),
  serveController.getServicemanProfile
);

servicemanRoutes.put(
  "/edit",
  verifyAdminToken,
  upload_serviceman.none(),
  serveController.editServicemanProfile
);

servicemanRoutes.put(
  "/editprofileimg",
  verifyAdminToken,
  upload_serviceman.single("profilePic"),
  serveController.editProfileImage
);

servicemanRoutes.put(
  "/changepassword",
  verifyAdminToken,
  upload_serviceman.none(),
  serveController.changeServicemanPassword
);

/********************** HOME PAGE APIs ************/
servicemanRoutes.post(
  "/gethomeitems",
  verifyAdminToken,
  upload_serviceman.none(),
  homeController.getHomeItems
);

module.exports = servicemanRoutes;
