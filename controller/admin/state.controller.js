const stateModel = require("../../model/state");

// add a state
exports.addState = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const state = await stateModel.findOne({
      title: req.body.title,
      isdeleted: "No"
    });

    if (state !== null) {
      res.status(400).json({ message: "State already exist" });
    } else {
      const stateObj = new stateModel({
        title: req.body.title,
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });

      const saveState = await stateObj.save();
      if (saveState) {
        res.status(200).json({ message: "State added successfully" });
      } else {
        res.status(400).json({ message: "State Could not be added!" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// get all states
exports.getAllStates = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition.title = regex;
    }
    condition.isdeleted = "No";
    console.log(condition);

    const states = await stateModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "States have been retrieved successfully",
      states: states
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all non deleted states
exports.getAllNonDeletedStates = async function (req, res) {
  try {
    const states = await stateModel
      .find({ isdeleted: "No" })
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "States have been retrieved successfully",
      states: states
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get state
exports.getState = async function (req, res) {
  try {
    const state = await stateModel.findOne({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "State has been retrieved successfully",
      stateResult: state ?? {}
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// edit state
exports.editState = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const state = await stateModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (state) {
      res.status(200).json({
        success: true,
        message: "State has been updated successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// delete state
exports.deleteState = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const state = await stateModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isdeleted: "Yes",
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (state) {
      res.status(200).json({
        success: true,
        message: "State has been deleted successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
