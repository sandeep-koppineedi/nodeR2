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
  "/addcity",
  verifyAdminToken,
  upload_profileImg.none(),
  cityController.addCity
);

cityRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  cityController.getAllCities
);

cityRoutes.post(
  "/getalldropdown",
  upload_profileImg.none(),
  cityController.getAllNonDeletedCities
);

cityRoutes.post(
  "/getallbydistid",
  upload_profileImg.none(),
  cityController.getAllCitiesByDist
);

cityRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_profileImg.none(),
  cityController.getCity
);

cityRoutes.put(
  "/editcity/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  cityController.editCity
);

cityRoutes.delete(
  "/deletecity/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  cityController.deleteCity
);

module.exports = cityRoutes;
