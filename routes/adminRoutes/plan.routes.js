const express = require("express");
const planRoutes = express.Router();
const cors = require("cors");

//controller
const planController = require("../../controller/admin/plan.controller");
//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_planImg } = require("../../middleware/uploadImage");

//admin registration
planRoutes.post(
  "/addplan",
  verifyAdminToken,
  upload_planImg.single("planImage"),
  planController.addPlan
);

planRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_planImg.none(),
  planController.getAllPlans
);

planRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_planImg.none(),
  planController.getPlan
);

planRoutes.put(
  "/editplan/:id",
  verifyAdminToken,
  upload_planImg.single("planImage"),
  planController.editPlan
);

planRoutes.put(
  "/editplanstatus/:id",
  verifyAdminToken,
  upload_planImg.none(),
  planController.changePlanStatus
);

module.exports = planRoutes;
