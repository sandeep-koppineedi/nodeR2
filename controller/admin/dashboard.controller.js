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

    /////////////  DASHBOARD GRAPH  ////////////////
    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    const graphBookings = await Promise.all(
      months.map(async (month) => {
        const year = new Date().getMonth() < month - 1 ? nextYear : currentYear;

        return await bookingz(month, year);
      })
    );

    async function bookingz(month, year) {
      const startDate = new Date(`${year}-${month}-01`).toISOString();

      const endDate = new Date(
        `${year}-${month}-${new Date(year, month, 0).getDate()}`
      ).toISOString();

      const booking = await bookingModel
        .find({
          logCreatedDate: {
            $gte: startDate,
            $lt: endDate,
          },
        })
        .countDocuments();

      return booking;
    }

    // booking payments
    const graphPayments = await Promise.all(
      months.map(async (month) => {
        const year = new Date().getMonth() < month - 1 ? nextYear : currentYear;

        return await paymentz(month, year);
      })
    );

    async function paymentz(month, year) {
      const startDate = new Date(`${year}-${month}-01`).toISOString();

      const endDate = new Date(
        `${year}-${month}-${new Date(year, month, 0).getDate()}`
      ).toISOString();

      const bookinggs = await bookingModel.find({
        logCreatedDate: {
          $gte: startDate,
          $lt: endDate,
        },
        status: "completed",
      });

      let payment = 0;
      for (let bookingg of bookinggs) {
        let bookingNum = parseInt(bookingg.totalAmount);
        if (!isNaN(bookingNum)) {
          payment = payment + bookingNum;
        }
      }

      return payment;
    }

    // running plans
    const graphPlans = await Promise.all(
      months.map(async (month) => {
        const year = new Date().getMonth() < month - 1 ? nextYear : currentYear;

        return await planz(month, year);
      })
    );

    async function planz(month, year) {
      const startDate = new Date(`${year}-${month}-01`).toISOString();

      const endDate = new Date(
        `${year}-${month}-${new Date(year, month, 0).getDate()}`
      ).toISOString();

      const Plans = await planModel
        .find({
          logCreatedDate: {
            $gte: startDate,
            $lt: endDate,
          },
          status: "active",
        })
        .countDocuments();

      return Plans;
    }

    res.status(200).json({
      success: true,
      message: "data has been retrieved successfully",
      bookings: bookings,
      totalAmount: totalAmount,
      vendors: vendors,
      runningPlans: runningPlans,
      latestBookings: latestBookings,
      graphBookings: graphBookings,
      graphPayments: graphPayments,
      graphPlans: graphPlans,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
