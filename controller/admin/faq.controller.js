const faqModel = require("../../model/faq");

// add faq
exports.addFaq = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const faqObj = new faqModel({
      question: req.body.question,
      answer: req.body.answer,
      logCreatedDate: logDate,
      logModifiedDate: logDate
    });

    const saveFAq = await faqObj.save();
    if (saveFAq) {
      res
        .status(200)
        .json({ success: true, message: "FAQ has been added successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "FAQ could not be added" });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// get all FAQs
exports.getAllFAQs = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery !== "") {
      condition = {
        $or: [{ question: regex }, { answer: regex }]
      };
    }
    console.log(condition);

    const faqs = await faqModel.find(condition).sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "FAQs has been retrieved successfully",
      faqs: faqs
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// edit all FAQs
exports.editFAQs = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const faqs = await faqModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          question: req.body.question,
          answer: req.body.answer,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (faqs) {
      res.status(200).json({
        success: true,
        message: "FAQ has been updated successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// delete  FAQs
exports.deleteFAQs = async function (req, res) {
  try {
    const faqs = await faqModel.findOneAndDelete({ _id: req.params.id });

    if (faqs) {
      res.status(200).json({
        success: true,
        message: "FAQ has been remvoed successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
