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
  "/getallfordropdown",
  upload_profileImg.none(),
  stateController.getAllNonDeletedStates
);

module.exports = stateRoutes;
