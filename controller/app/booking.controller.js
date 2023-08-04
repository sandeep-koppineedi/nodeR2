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
    const customer = await customerModel.findOne(
      { _id: req.userId },
      {
        customerName: 1,
        phone: 1,
        franchiseId: 1,
        franchiseName: 1,
        franchisePhone: 1,
        servicemanId: 1,
        servicemanName: 1,
        servicemanPhone: 1,
      }
    );

    const bookObj = new bookingModel({
      userId: req.userId,
      userName: customer ? customer.customerName : "",
      userPhone: customer ? customer.phone : "",
      servicemanId: customer
        ? customer.servicemanId
        : console.log("No serviceman id"),
      servicemanName: customer ? customer.servicemanName : "",
      servicemanPhone: customer ? customer.servicemanPhone : "",
      franchiseId: customer
        ? customer.franchiseId
        : console.log("No franchise id"),
      franchiseName: customer ? customer.franchiseName : "",
      franchisePhone: customer ? customer.franchisePhone : "",
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

// get all bookings
exports.getAllBookings = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { planName: regex }, { status: regex }],
      };
    }
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
