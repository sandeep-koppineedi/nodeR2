const planModel = require("../../model/plan");

// add plan
exports.addPlan = async function (req, res) {
  try {
    const plann = await planModel.findOne({ title: req.body.title });

    if (plann) {
      return res
        .status(400)
        .json({ success: false, message: "Plan already exists!" });
    } else {
      const logDate = new Date().toISOString();
      const planObj = new planModel({
        title: req.body.title,
        planType: req.body.planType,
        planImage: req.file ? req.file.path : "",
        oneMonthLiters: req.body.oneMonthLiters,
        oneMonthPrice: req.body.oneMonthPrice,
        threeMonthLiters: req.body.threeMonthLiters,
        threeMonthPrice: req.body.threeMonthPrice,
        sixMonthLiters: req.body.sixMonthLiters,
        sixMonthPrice: req.body.sixMonthPrice,
        twelveMonthLiters: req.body.twelveMonthLiters,
        twelveMonthPrice: req.body.twelveMonthPrice,
        description: req.body.description,
        planAdvantages: JSON.parse(req.body.planAdvantages),
        // planAdvantages: req.body.planAdvantages,
        status: "active",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });
      const userData = await planObj.save();
      if (userData) {
        return res.status(200).json({
          success: true,
          message: "Plan has been added successfully"
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Plan could not be added"
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message ?? "Something went wrong!"
    });
  }
};

// get all plans list
exports.getAllPlans = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery !== "") {
      condition = {
        $or: [{ title: regex }, { planType: regex }]
      };
    }
    console.log(condition);

    const result = await planModel.find(condition).sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Plans have been retrieved successfully",
      planResult: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Bad request"
    });
  }
};

// get plans details
exports.getPlan = async function (req, res) {
  try {
    const result = await planModel.find({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "Plans have been retrieved successfully",
      planResult: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Bad request"
    });
  }
};

// edit plan
exports.editPlan = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const result = await planModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          planType: req.body.planType,
          planImage: req.file ? req.file.path : console.log("No Img"),
          oneMonthLiters: req.body.oneMonthLiters,
          oneMonthPrice: req.body.oneMonthPrice,
          threeMonthLiters: req.body.threeMonthLiters,
          threeMonthPrice: req.body.threeMonthPrice,
          sixMonthLiters: req.body.sixMonthLiters,
          sixMonthPrice: req.body.sixMonthPrice,
          twelveMonthLiters: req.body.twelveMonthLiters,
          twelveMonthPrice: req.body.twelveMonthPrice,
          description: req.body.description,
          planAdvantages: JSON.parse(req.body.planAdvantages),
          // planAdvantages: req.body.planAdvantages,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Plan has been updated successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Plan could not be updated"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// edit plan
exports.changePlanStatus = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const result = await planModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Plan status has been updated successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Plan could not be updated"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};
