const cityModel = require("../../model/city");
const districtModel = require("../../model/district");
const stateModel = require("../../model/state");

// add a city
exports.addCity = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const dist = await cityModel.findOne({
      title: req.body.title,
      isdeleted: "No"
    });

    if (dist !== null) {
      res.status(400).json({ message: "City already exist!" });
    } else {
      const stater = await stateModel.findOne(
        { _id: req.body.stateId },
        { title: 1 }
      );
      const distr = await districtModel.findOne(
        { _id: req.body.districtId },
        { title: 1 }
      );

      const cityObj = new cityModel({
        title: req.body.title,
        stateId: req.body.stateId,
        stateName: stater ? stater.title : "",
        districtId: req.body.districtId,
        districtName: distr ? distr.title : "",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });

      const saveCity = await cityObj.save();
      if (saveCity) {
        res.status(200).json({ message: "City added successfully" });
      } else {
        res.status(400).json({ message: "City could not be added!" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

// get all cities
exports.getAllCities = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition.title = regex;
    }
    condition.isdeleted = "No";
    console.log(condition);

    const data = await cityModel.find(condition).sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Cities have been retrieved successfully",
      cityResult: data
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all Non deleted cities
exports.getAllNonDeletedCities = async function (req, res) {
  try {
    const data = await cityModel
      .find({ isdeleted: "No" })
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Cities have been retrieved successfully",
      cityResult: data
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all cities by district id
exports.getAllCitiesByDist = async function (req, res) {
  try {
    const data = await cityModel
      .find({
        $and: [{ districtId: req.body.districtId }, { isdeleted: "No" }]
      })
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Cities have been retrieved successfully",
      cityResult: data
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get city details
exports.getCity = async function (req, res) {
  try {
    const data = await cityModel.findOne({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "City has been retrieved successfully",
      cityResult: data ?? {}
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// edit City
exports.editCity = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const stater = await stateModel.findOne(
      { _id: req.body.stateId },
      { title: 1 }
    );
    const distr = await districtModel.findOne(
      { _id: req.body.districtId },
      { title: 1 }
    );
    const City = await cityModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          stateId: req.body.stateId,
          stateName: stater ? stater.title : "",
          districtId: req.body.districtId,
          districtName: distr ? distr.title : "",
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (City) {
      res.status(200).json({
        success: true,
        message: "City has been updated successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// delete City
exports.deleteCity = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const City = await cityModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isdeleted: "Yes",
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (City) {
      res.status(200).json({
        success: true,
        message: "City has been deleted successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
