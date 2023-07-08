const express = require("express");
const faqRoutes = express.Router();
const cors = require("cors");

//controller
const faqController = require("../../controller/admin/faq.controller");

//middlewares
const { verifyAdminToken } = require("../../middleware/verifyToken");
const { upload_profileImg } = require("../../middleware/uploadImage");

//admin registration
faqRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  faqController.getAllFAQs
);

module.exports = faqRoutes;
