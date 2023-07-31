const bookingModel = require("../../model/booking");
const franchiseModel = require("../../model/franchise");
const planModel = require("../../model/plan");
const servicemanModel = require("../../model/serviceman");

// get dashboard items
exports.getDashboard = async function (req, res) {
  try {
    //////////////  Total Number of ServiceMANs ///////////////
    const serviceMans = await servicemanModel
      .find({
        $and: [{ franchiseId: req.userId }, { isdelete: "No" }],
      })
      .countDocuments();

    //////////////  Total Number of Bookings ///////////////
    const bookings = await bookingModel
      .find({ franchiseId: req.userId })
      .countDocuments();

    //////////////  Revenue ////////////////////
    const books = await bookingModel.find(
      {
        $and: [{ franchiseId: req.userId }, { status: "completed" }],
      },
      {}
    );
    let totalAmount = 0;
    for (let book of books) {
      let bookAmount = parseInt(book.totalAmount);

      if (!isNaN(bookAmount)) {
        totalAmount = totalAmount + bookAmount;
      }
    }

    // /////////////// VENDORS COUNT ///////////////
    // const vendors = await franchiseModel.find().countDocuments();

    ////////////// RUNNING PLANS ///////////////
    const runningPlans = await planModel
      .find({ status: "active" })
      .countDocuments();

    ////////////// LATEST BOOKINGS /////////////////
    const latestBookings = await bookingModel
      .find({ franchiseId: req.userId })
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "data has been retrieved successfully",
      serviceMans: serviceMans,
      bookings: bookings,
      totalAmount: totalAmount,
      runningPlans: runningPlans,
      latestBookings: latestBookings,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
