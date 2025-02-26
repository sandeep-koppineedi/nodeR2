const bookingModel = require("../../model/booking");
const cityModel = require("../../model/city");
const customerModel = require("../../model/customer");
const districtModel = require("../../model/district");
const planModel = require("../../model/plan");
const stateModel = require("../../model/state");

// add a Booking
exports.addBooking = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const todaye = new Date().toISOString().slice(0, 10);
    let currentDate = new Date();
    let year;
    let month;
    let day;
    let nextMonthDate;
    let nextMonthYear;
    let nextMonth;
    let nextMonthDaysInMonth;
    let nextMonthDay;
    let monthDate;

    year = currentDate.getFullYear();
    month = currentDate.getMonth() + 1;
    day = currentDate.getDate();
    nextMonth = ((month + 1) % 12) + 1;
    nextMonthYear = year + Math.floor((month + 1) / 12);
    nextMonthDaysInMonth = new Date(nextMonthYear, nextMonth, 0).getDate();
    nextMonthDay = Math.min(day, nextMonthDaysInMonth);
    monthDate = new Date(nextMonthYear, nextMonth - 1, nextMonthDay)
      .toISOString()
      .slice(0, 10);
    console.log(monthDate);

    let randomDate = Date.now();
    let randomNumber = randomDate.toString().slice(5, 13);
    // console.log(a);
    // console.log(b);

    // let tax = parseInt(req.body.tax)
    // let taxAmount = tax/100
    // let totalAmount = parseInt(req.body.totalAmount);

    // let sumId;
    // let cId;
    // const count = await bookingModel.find().countDocuments();
    // if (count > 0) {
    // const data = await bookingModel.findOne().sort({ _id: -1 });
    // let x = data.orderId.substring(3); //substring is used here removing KNV from the order no
    //   let a = parseInt(x);
    //   sumId = a != undefined ? a + 1 : 1;
    //   cId = String(sumId).padStart(8, "0");
    //   // console.log(cId);
    // } else {
    //   sumId = 1;
    //   cId = String(sumId).padStart(8, "0");
    //   // console.log(cId);
    // }

    const bookObj = new bookingModel({
      userId: req.body.userId, // in actual this is customer app API. so use req.userId
      userName: req.body.userName,
      planId: req.body.planId,
      planName: req.body.planName,
      planPriod: req.body.planPriod,
      planAmount: req.body.planAmount,
      tax: req.body.tax,
      totalAmount: req.body.totalAmount,
      orderId: "KNV" + randomNumber,
      transactionId: req.body.transactionId,
      subscribeDate: req.body.subscribeDate,
      expiryDate: monthDate,
      status: "pending",
      logCreatedDate: logDate,
      logModifiedDate: logDate,
    });

    const saveBooking = await bookObj.save();
    if (saveBooking) {
      res.status(200).json({ message: "Booking added successfully" });
    } else {
      res.status(400).json({ message: "Booking could not be added!" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

// get all pending bookings
exports.getAllPendingBookings = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { planName: regex }],
      };
    }
    condition.status = "pending";
    condition.franchiseId = req.userId;
    console.log(condition);

    const data = await bookingModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Bookings have been retrieved successfully",
      bookingResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all Accepted bookings
exports.getAllAcceptedBookings = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { planName: regex }],
      };
    }
    condition.status = "accepted";
    condition.franchiseId = req.userId;
    console.log(condition);

    const data = await bookingModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Bookings have been retrieved successfully",
      bookingResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all Assigned bookings
exports.getAllAssignedBookings = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { planName: regex }],
      };
    }
    condition.status = "assigned";
    condition.franchiseId = req.userId;
    console.log(condition);

    const data = await bookingModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Bookings have been retrieved successfully",
      bookingResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all InProgress bookings
exports.getAllInProgressBookings = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { planName: regex }],
      };
    }
    condition.status = "inProgress";
    condition.franchiseId = req.userId;
    console.log(condition);

    const data = await bookingModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Bookings have been retrieved successfully",
      bookingResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all Completed bookings
exports.getAllCompletedBookings = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { planName: regex }],
      };
    }
    condition.status = "completed";
    condition.franchiseId = req.userId;
    console.log(condition);

    const data = await bookingModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Bookings have been retrieved successfully",
      bookingResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all Canceled bookings
exports.getAllCanceledBookings = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { planName: regex }],
      };
    }
    condition.status = "canceled";
    condition.franchiseId = req.userId;
    console.log(condition);

    const data = await bookingModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Bookings have been retrieved successfully",
      bookingResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get booking details
exports.getBookingDetails = async function (req, res) {
  try {
    const data = await bookingModel.findOne({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "Booking has been retrieved successfully",
      bookingResult: data ?? {},
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// edit BookingStatus
exports.editBookingStatus = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const Booking = await bookingModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
          logModifiedDate: logDate,
        },
      },
      { new: true }
    );

    if (Booking) {
      res.status(200).json({
        success: true,
        message: "Booking status has been updated successfully",
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// // delete City
// exports.deleteCity = async function (req, res) {
//   try {
//     const logDate = new Date().toISOString();
//     const City = await bookingModel.updateOne(
//       { _id: req.params.id },
//       {
//         $set: {
//           isdeleted: "Yes",
//           logModifiedDate: logDate
//         }
//       },
//       { new: true }
//     );

//     if (City) {
//       res.status(200).json({
//         success: true,
//         message: "City has been deleted successfully"
//       });
//     }
//   } catch (err) {
//     res
//       .status(400)
//       .json({ success: false, message: err.message ?? "Bad request" });
//   }
// };
