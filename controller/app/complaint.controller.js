const bookingModel = require("../../model/booking");
const cityModel = require("../../model/city");
const customerModel = require("../../model/customer");
const districtModel = require("../../model/district");
const planModel = require("../../model/plan");
const complaintModel = require("../../model/complainBox");
const stateModel = require("../../model/state");

// add a Complaint
exports.addComplaint = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const todaye = new Date().toISOString().slice(0, 10);

    let randomNumber = Date.now();

    const customer = await customerModel.findOne(
      { _id: req.userId },
      { franchiseId: 1, franchiseName: 1, franchisePhone: 1 }
    );

    const serveObj = new complaintModel({
      title: req.body.title,
      image: req.file ? req.file.path : "",
      description: req.body.description,
      userId: req.userId, // in actual this is customer app API. so use req.userId
      userName: req.body.userName,
      userPhone: req.body.userPhone,
      ticketId: "KNV" + randomNumber,
      franchiseId: customer
        ? customer.franchiseId
        : console.log("No franchise"),
      franchiseName: customer ? customer.franchiseName : "",
      franchisePhone: customer ? customer.franchisePhone : "",
      status: "pending",
      logCreatedDate: logDate,
      logModifiedDate: logDate
    });

    const saveServe = await serveObj.save();
    if (saveServe) {
      res.status(200).json({ message: "Complaint initiated successfully" });
    } else {
      res.status(400).json({ message: "Complaint could not be added!" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

// get all Complaint
exports.getAllComplaint = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [
          { title: regex },
          { userName: regex },
          { status: regex },
          { userPhone: regex },
          { ticketId: regex }
        ]
      };
    }
    console.log(condition);

    const data = await complaintModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Complaints have been retrieved successfully",
      complaintResult: data
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
