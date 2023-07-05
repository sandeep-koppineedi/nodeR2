const express = require("express");
const stateRoutes = express.Router();
const cors = require("cors");

//controller
const stateController = require("../../controller/admin/state.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
stateRoutes.post(
  "/addstate",
  verifyAdminToken,
  upload_profileImg.none(),
  stateController.addState
);

stateRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  stateController.getAllStates
);

stateRoutes.post(
  "/getallfordropdown",
  upload_profileImg.none(),
  stateController.getAllNonDeletedStates
);

stateRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_profileImg.none(),
  stateController.getState
);

stateRoutes.put(
  "/editstate/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  stateController.editState
);

stateRoutes.delete(
  "/deletestate/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  stateController.deleteState
);

module.exports = stateRoutes;
