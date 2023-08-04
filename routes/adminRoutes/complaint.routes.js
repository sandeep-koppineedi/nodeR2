const express = require("express");
const complaintRoutes = express.Router();
const cors = require("cors");

//controller
const complaintController = require("../../controller/admin/complaint.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_complaint } = require("../../middleware/uploadImage");

//admin registration
complaintRoutes.post(
  "/addcomplaint",
  verifyAdminToken,
  upload_complaint.single("image"),
  complaintController.addComplaint
);

complaintRoutes.post(
  "/getallpending",
  verifyAdminToken,
  upload_complaint.none(),
  complaintController.getAllPendingComplaint
);

complaintRoutes.post(
  "/getallcompleted",
  verifyAdminToken,
  upload_complaint.none(),
  complaintController.getAllCompletedComplaint
);

complaintRoutes.post(
  "/getallrejected",
  verifyAdminToken,
  upload_complaint.none(),
  complaintController.getAllRejectedComplaint
);

complaintRoutes.put(
  "/updatestatus/:id",
  verifyAdminToken,
  upload_complaint.none(),
  complaintController.updateComplaintStatus
);

module.exports = complaintRoutes;
