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
  "/getallpending",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getAllPendingBookings
);

bookRoutes.post(
  "/getallaccepted",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getAllAcceptedBookings
);

bookRoutes.post(
  "/getallassigned",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getAllAssignedBookings
);

bookRoutes.post(
  "/getallinprogress",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getAllInProgressBookings
);

bookRoutes.post(
  "/getallcompleted",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getAllCompletedBookings
);

bookRoutes.post(
  "/getallcanceled",
  verifyAdminToken,
  upload_profileImg.none(),
  bookController.getAllCanceledBookings
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
