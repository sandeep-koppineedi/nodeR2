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
  "/addfaq",
  verifyAdminToken,
  upload_profileImg.none(),
  faqController.addFaq
);

faqRoutes.post(
  "/getall",
  verifyAdminToken,
  upload_profileImg.none(),
  faqController.getAllFAQs
);

faqRoutes.put(
  "/editfaq/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  faqController.editFAQs
);

faqRoutes.delete(
  "/deletefaq/:id",
  verifyAdminToken,
  upload_profileImg.none(),
  faqController.deleteFAQs
);

module.exports = faqRoutes;
