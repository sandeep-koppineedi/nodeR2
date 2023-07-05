const express = require("express");
const distRoutes = express.Router();
const cors = require("cors");

//controller
const distController = require("../../controller/admin/district.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
distRoutes.post(
  "/adddist",
  verifyAdminToken,
  upload_profileImg.none(),
  distController.addDistrict
);

distRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  distController.getAllDistricts
);

distRoutes.post(
  "/getalldropdown",
  upload_profileImg.none(),
  distController.getAllNonDeletedDistricts
);

distRoutes.post(
  "/getallbystateid",
  upload_profileImg.none(),
  distController.getAllDistrictByState
);

distRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_profileImg.none(),
  distController.getDistrict
);

distRoutes.put(
  "/editdist/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  distController.editDistrict
);

distRoutes.delete(
  "/deletedist/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  distController.deleteDistrict
);

module.exports = distRoutes;
