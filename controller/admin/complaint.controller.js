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

    const serveObj = new complaintModel({
      title: req.body.title,
      image: req.file ? req.file.path : "",
      description: req.body.description,
      userId: req.body.userId, // in actual this is customer app API. so use req.userId
      userName: req.body.userName,
      userPhone: req.body.userPhone,
      ticketId: "KNV" + randomNumber,
      status: "pending",
      logCreatedDate: logDate,
      logModifiedDate: logDate,
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

// get all pending Complaint
exports.getAllPendingComplaint = async function (req, res) {
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
          { ticketId: regex },
        ],
      };
    }
    condition.status = "pending";
    console.log(condition);

    const data = await complaintModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Complaints have been retrieved successfully",
      complaintResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all CompletedComplaint
exports.getAllCompletedComplaint = async function (req, res) {
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
          { ticketId: regex },
        ],
      };
    }
    condition.status = "completed";
    console.log(condition);

    const data = await complaintModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Complaints have been retrieved successfully",
      complaintResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all RejectedComplaint
exports.getAllRejectedComplaint = async function (req, res) {
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
          { ticketId: regex },
        ],
      };
    }
    condition.status = "rejected";
    console.log(condition);

    const data = await complaintModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Complaints have been retrieved successfully",
      complaintResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// update complaint status
exports.updateComplaintStatus = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const upComplaint = await complaintModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
          rejectionReason: req.body.rejectionReason ?? "",
          logModifiedDate: logDate,
        },
      },
      { new: true }
    );

    if (upComplaint) {
      res.status(200).json({
        success: true,
        message: "Complaint has been updated successfully",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!",
    });
  }
};
