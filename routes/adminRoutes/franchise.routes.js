const express = require("express");
const franchRoutes = express.Router();
const cors = require("cors");

//controller
const franchController = require("../../controller/admin/franchise.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_franchise } = require("../../middleware/uploadImage");

//admin registration
franchRoutes.post(
  "/addfranchise",
  verifyAdminToken,
  upload_franchise.fields([
    {
      name: "companyIdImage",
      maxCount: 1
    },
    {
      name: "companyLogo",
      maxCount: 1
    }
  ]),
  franchController.addFranchise
);

franchRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_franchise.none(),
  franchController.getAllFranchisees
);

franchRoutes.post(
  "/dropdown",
  verifyAdminToken,
  upload_franchise.none(),
  franchController.getAllDropdownFranchisees
);

franchRoutes.post(
  "/getdetails",
  verifyAdminToken,
  upload_franchise.none(),
  franchController.getFranchise
);

franchRoutes.put(
  "/editfrach/:id",
  verifyAdminToken,
  upload_franchise.fields([
    {
      name: "companyIdImage",
      maxCount: 1
    },
    {
      name: "companyLogo",
      maxCount: 1
    }
  ]),
  franchController.editFranchise
);

franchRoutes.put(
  "/editfrachstatus/:id",
  verifyAdminToken,
  upload_franchise.none(),
  franchController.changeFranchStatus
);

module.exports = franchRoutes;
