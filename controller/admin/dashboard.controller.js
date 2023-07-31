const bookingModel = require("../../model/booking");
const franchiseModel = require("../../model/franchise");
const planModel = require("../../model/plan");

// get dashboard items
exports.getDashboard = async function (req, res) {
  try {
    //////////////  Total Number of Bookings ///////////////
    const bookings = await bookingModel.find().countDocuments();

    //////////////  Revenue ////////////////////
    const books = await bookingModel.find({ status: "completed" }, {});
    let totalAmount = 0;
    for (let book of books) {
      let bookAmount = parseInt(book.totalAmount);

      if (!isNaN(bookAmount)) {
        totalAmount = totalAmount + bookAmount;
      }
    }

    /////////////// VENDORS COUNT ///////////////
    const vendors = await franchiseModel.find().countDocuments();

    ////////////// RUNNING PLANS ///////////////
    const runningPlans = await planModel
      .find({ status: "active" })
      .countDocuments();

    ////////////// LATEST BOOKINGS /////////////////
    const latestBookings = await bookingModel
      .find()
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "data has been retrieved successfully",
      bookings: bookings,
      totalAmount: totalAmount,
      vendors: vendors,
      runningPlans: runningPlans,
      latestBookings: latestBookings,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
