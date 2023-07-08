const vendorModel = require("../../model/franchise");
const customerModel = require("../../model/customer");
const servicemanModel = require("../../model/serviceman");
const notificationModel = require("../../model/servicemanNotification");

// create new notification
exports.createNotification = async function (req, res) {
  // try {
  console.log(req.body);
  const logData = new Date().toISOString();

  let allUsers = [];
  const notifyUserId = await servicemanModel.find(
    { isdelete: "No" },
    { _id: 1, notificationBell: 1 }
  );

  if (req.body.userList == "All") {
    notifyUserId.map((item) => {
      if (item.notificationBell == true) {
        // console.log(item);
        allUsers.push(item._id.toString());
      } else {
        console.log("No user");
      }
    });
    // if (allUsers.length > 0) {
    //   const fcmUser = await servicemanModel.find({
    //     $and: [{ _id: { $in: allUsers } }, { notificationBell: true }]
    //   });

    //   let custFcm = fcmUser.map((valu) => {
    //     return valu.appFcmToken;
    //   });

    //   // console.log(fcmUser);
    //   const registrationToken = custFcm;

    //   let message = {
    //     registration_ids: registrationToken,
    //     notification: {
    //       title: req.body.title,
    //       body: req.body.description
    //       image: "http://103.186.185.77:5040/uploads/public/kanav.jpg",
    //     }
    //   };
    //   console.log(message);

    //   fcm.send(message, function (err, response) {
    //     if (err) {
    //       console.log("Something went wrong!");

    //       // return res.status(400).json({ message: "Failed", Error: err });
    //     }
    //     if (response) {
    //       console.log("Successfully sent with response: ", response);
    //     }
    //   });
    // } else {
    //   console.log("No FCM");
    // }
  } else {
    const showServiceman = await servicemanModel.find(
      {
        $and: [{ _id: { $in: req.body.userList } }, { isdelete: "No" }]
      },
      { _id: 1, notificationBell: 1 }
    );
    showServiceman.map((val) => {
      if (val.notificationBell == true) {
        allUsers.push(val._id.toString());
      } else {
        console.log("No user");
      }
    });

    // if (allUsers.length > 0) {
    //   const fcmUser = await servicemanModel.find({
    //     $and: [{ _id: { $in: allUsers } }, { notificationBell: true }]
    //   });

    //   let custFcm = fcmUser.map((valu) => {
    //     return valu.appFcmToken;
    //   });

    //   // console.log(fcmUser);
    //   const registrationToken = custFcm;

    //   let message = {
    //     registration_ids: registrationToken,
    //     notification: {
    //       title: req.body.title,
    //       body: req.body.description,
    //       image: "http://103.186.185.77:5040/uploads/public/kanav.jpg",
    //     }
    //   };
    //   console.log(message);

    //   fcm.send(message, function (err, response) {
    //     if (err) {
    //       console.log("Something went wrong!");

    //       // return res.status(400).json({ message: "Failed", Error: err });
    //     }
    //     if (response) {
    //       console.log("Successfully sent with response: ", response);
    //     }
    //   });
    // }
  }

  // console.log(allUsers);

  new notificationModel({
    department: "Serviceman",
    users: allUsers,
    title: req.body.subject,
    description: req.body.description,
    logCreatedDate: logData,
    logModifiedDate: logData
  }).save();

  res.status(200).json({
    succes: true,
    message: "Notification has been added successfully"
  });
  // } catch {
  //   res.status(400).json({ status: false, message: "Something went wrong..!" });
  // }
};

// get all notifications
exports.getAllNotifications = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery !== "") {
      condition = { $or: [{ title: regex }, { description: regex }] };
    }
    console.log(condition);

    const notifResult = await notificationModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Notifications have been retrieved successfully",
      notifResult: notifResult
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// delete notification
exports.deleteNotification = async function (req, res) {
  try {
    const removeNotifcation = await notificationModel.findOneAndDelete({
      _id: req.params.id
    });

    if (removeNotifcation) {
      res.status(200).json({
        success: true,
        message: "Notification has been removed successfully"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};
