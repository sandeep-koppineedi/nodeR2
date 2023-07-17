const bannerModel = require("../../model/banner");
const planModel = require("../../model/plan");
const serviceModel = require("../../model/service");

// get home items
exports.getHomeItem = async function (req, res) {
  try {
    /************** GET ALL BANNERS ***************/
    const banners = await bannerModel.find().sort({ logCreatedDate: -1 });

    /************** GET ALL ACTIVE PLANS ***************/
    const plans = await planModel
      .find({ status: "active" })
      .sort({ logCreatedDate: -1 });

    /************** GET ALL Customer RUNNING SERVICES ***************/
    const services = await serviceModel
      .find({
        $and: [
          { userId: req.userId },
          {
            $or: [
              { status: "pending" },
              { status: "accepted" },
              { status: "assigned" },
              { status: "inProgress" }
            ]
          }
        ]
      })
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Home page data has been retrieved successfully",
      banners: banners,
      plans: plans,
      services: services
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
