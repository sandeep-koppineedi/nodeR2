const express = require("express");
const serveRoutes = express.Router();
const cors = require("cors");

//controller
const serveController = require("../../controller/admin/serviceman.controller");
// const employeeController = require("../../controller/admin/employee.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_serviceman } = require("../../middleware/uploadImage");

//admin registration
serveRoutes.post(
  "/adduser",
  verifyAdminToken,
  upload_serviceman.fields([
    {
      name: "profilePic",
      maxCount: 1
    },
    {
      name: "idImage",
      maxCount: 1
    }
  ]),
  serveController.addServiceman
);

serveRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_serviceman.none(),
  serveController.getAllServicemans
);

// serveRoutes.post(
//   "/getdetails",
//   verifyAdminToken,
//   upload_serviceman.none(),
//   serveController.getCustomer
// );

// serveRoutes.put(
//   "/edit/:id",
//   verifyAdminToken,
//   upload_serviceman.fields([
//   {
//     name: "profilePic",
//     maxCount:1
//   },
//   {
//     name: "idImage",
//     maxCount:1
//   },
// ]),
//   serveController.editCustomer
// );

// serveRoutes.put(
//   "/delete/:id",
//   verifyAdminToken,
//   upload_serviceman.none(),
//   serveController.changeCustomerAsDelete
// );

module.exports = serveRoutes;
