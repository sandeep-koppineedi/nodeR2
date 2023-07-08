const express = require("express");
const bookRoutes = express.Router();
const cors = require("cors");

//controller
const bookController = require("../../controller/admin/booking.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
bookRoutes.post(
  "/addbooking",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.addBooking
);

bookRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getAllBookings
);

// bookRoutes.post(
//   "/getalldropdown",
//   upload_profileImg.none(),
//   bookController.getAllNonDeletedCities
// );

// bookRoutes.post(
//   "/getallbydistid",
//   upload_profileImg.none(),
//   bookController.getAllCitiesByDist
// );

// bookRoutes.post(
//   "/getdetails",
//   verifyAdminToken,
//   upload_profileImg.none(),
//   bookController.getCity
// );

// bookRoutes.put(
//   "/editcity/:id",
//   verifyAdminToken,
//   upload_profileImg.none(),
//   bookController.editCity
// );

// bookRoutes.delete(
//   "/deletecity/:id",
//   verifyAdminToken,
//   upload_profileImg.none(),
//   bookController.deleteCity
// );

module.exports = bookRoutes;
