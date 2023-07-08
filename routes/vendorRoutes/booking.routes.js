const express = require("express");
const bookRoutes = express.Router();
const cors = require("cors");

//controller
const bookController = require("../../controller/vendor/booking.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
bookRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getAllBookings
);

bookRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getBookingDetails
);

bookRoutes.put(
  "/updatestatus/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.editBookingStatus
);

// bookRoutes.delete(
//   "/deletecity/:id",
//   verifyAdminToken,
//   upload_profileImg.none(),
//   bookController.deleteCity
// );

module.exports = bookRoutes;
