const express = require("express");
const complaintRoutes = express.Router();
const cors = require("cors");

//controller
const complaintController = require("../../controller/vendor/complaint.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_complaint } = require("../../middleware/uploadImage");

//admin registration
complaintRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_complaint.none(),
  complaintController.getAllComplaint
);

complaintRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_complaint.none(),
  complaintController.getComplaint
);

complaintRoutes.put(
  "/updatestatus/:id",
  verifyAdminToken,
  upload_complaint.none(),
  complaintController.editComplaintStatus
);

module.exports = complaintRoutes;
