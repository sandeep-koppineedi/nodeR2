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

module.exports = bookRoutes;
