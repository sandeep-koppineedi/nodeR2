const districtModel = require("../../model/district");
const stateModel = require("../../model/state");

// add a state
exports.addDistrict = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const dist = await districtModel.findOne({
      title: req.body.title,
      isdeleted: "No"
    });

    if (dist !== null) {
      res.status(400).json({ message: "District already exist!" });
    } else {
      const stater = await stateModel.findOne(
        { _id: req.body.stateId },
        { title: 1 }
      );

      const DistrictObj = new districtModel({
        title: req.body.title,
        stateId: req.body.stateId,
        stateName: stater ? stater.title : "",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });

      const saveDistrict = await DistrictObj.save();
      if (saveDistrict) {
        res.status(200).json({ message: "District added successfully" });
      } else {
        res.status(400).json({ message: "District could not be added!" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

// get all dist
exports.getAllDistricts = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition.title = regex;
    }
    condition.isdeleted = "No";
    console.log(condition);

    const data = await districtModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Districts have been retrieved successfully",
      distResult: data
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all Non deleted Districts
exports.getAllNonDeletedDistricts = async function (req, res) {
  try {
    const Districts = await districtModel
      .find({ isdeleted: "No" })
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Districts have been retrieved successfully",
      Districts: Districts
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all Non deleted Districts by State id
exports.getAllDistrictByState = async function (req, res) {
  try {
    const Districts = await districtModel
      .find({
        $and: [{ stateId: req.body.stateId }, { isdeleted: "No" }]
      })
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Districts have been retrieved successfully",
      Districts: Districts
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get district
exports.getDistrict = async function (req, res) {
  try {
    const District = await districtModel.findOne({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "District has been retrieved successfully",
      districtResult: District ?? {}
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// edit District
exports.editDistrict = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const stater = await stateModel.findOne(
      { _id: req.body.stateId },
      { title: 1 }
    );
    const District = await districtModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          stateId: req.body.stateId,
          stateName: stater ? stater.title : "",
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (District) {
      res.status(200).json({
        success: true,
        message: "District has been updated successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// delete District
exports.deleteDistrict = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const District = await districtModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isdeleted: "Yes",
          logModifiedDate: logDate
        }
      }
    );

    if (District) {
      res.status(200).json({
        success: true,
        message: "District has been deleted successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
