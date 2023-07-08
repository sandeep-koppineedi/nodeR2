const express = require("express");
const cityRoutes = express.Router();
const cors = require("cors");

//controller
const cityController = require("../../controller/admin/city.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
cityRoutes.post(
  "/getalldropdown",
  upload_profileImg.none(),
  cityController.getAllCitiesByDist
);

module.exports = cityRoutes;
