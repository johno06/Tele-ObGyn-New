const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middleware/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModels");
const moment = require("moment");

router.post("/get-user-info-by-id", async (req, res) => {
  try {
    // const user = await User.findOne({ userId: req.body.userId });
    const user = await User.findById({ _id: req.body._id });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/get-doctor-info-by-user-id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );

    res.status(200).send({
      success: true,
      message: "Updated successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error updating doctor profile",
        success: false,
        error,
      });
  }
});

router.post("/get-doctor-info-by-id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body._id });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/get-appointments-by-doctor-id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    const appointments = await Appointment.find({ doctorId: doctor._id });
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
});

router.post("/get-appointment-id", async (req, res) => {
  try {
    // const doctor = await Doctor.findOne ({_id: req.body.doctorId});
    const appointments = await Appointment.findById({ _id: req.body._id });
    res.status(200).send({
      message: "Appointment fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointment",
      success: false,
      error,
    });
  }
});

// router.post("/get-appointment-by-user-id", async (req, res) => {
//   try {
//     const doctor = await Doctor.findOne({ _id: req.body.doctorId });
//     const appointments = await Appointment.find({doctorId: doctor._id});
//     res.status(200).send({
//       message: "Appointments fetched successfully",
//       success: true,
//       data: appointments,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error fetching appointments",
//       success: false,
//       error,
//     });
//   }
// });

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });
    //Find user first
    const user = await User.findOne({ _id: appointment.userId });
    //Fetch unseen notifications
    const unseenNotifications = user.unseenNotifications;
    //Push notifications to user
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment has been ${status}`,
      onClickPath: "/appointments",
    });
    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "Error changing appointment status",
        success: false,
        error,
      });
  }
});

// router.patch ('/updateRtcToken/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const updates = req.body;
//     const options = {new: true};

//     const result = await User.findByIdAndUpdate (id, updates, options);
//     res.send (result);
//   } catch (error) {
//     console.log (error.message);
// res.json({message:'email is already used'})

// yung dalawang codes dito yung codes na ginamit ko sa book appointment ng user, syempre iuupgrade mo kasi si god ramos ka

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:00").toISOString();

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to doctor based on his userid
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      //req.body.userInfo.name
      message: `A new appointment request has been made by ${req.body.userInfo.user.name}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

router.post("/check-booking-availability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:00")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:00").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
});

router.patch("/updateRtcToken/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updates, options);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    // res.json({message:'email is already used'})
  }
});


router.patch ('/updateBookingAppointment/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = {new: true};

    const result = await Appointment.findByIdAndUpdate (id, updates, options);
    res.send (result);
  } catch (error) {
    console.log (error.message);
    // res.json({message:'email is already used'})
  }
});

router.get ('/get-all-pending-appointments', async (req, res) => {
  try {
    const appointment = await Appointment.find ({
      status: "pending",
    });
    res.status (200).send ({
      message: 'Pending Appointments fetched successfully',
      success: true,
      data: appointment.length,
    });
  } catch (error) {
    console.log (error);
    res.status (500).send ({
      message: 'Error',
      success: false,
      error,
    });
  }
});


router.get ('/get-all-completed-appointments', async (req, res) => {
  try {
    const appointment = await Appointment.find ({
      status: 'completed',
    });
    res.status (200).send ({
      message: 'Completed Appointments fetched successfully',
      success: true,
      data: appointment.length,
    });
  } catch (error) {
    console.log (error);
    res.status (500).send ({
      message: 'Error',
      success: false,
      error,
    });
  }
});
router.get ('/get-all-approved-appointments', async (req, res) => {
  try {
    const appointment = await Appointment.find ({
      status: 'approved',
    });
    res.status (200).send ({
      message: 'Approved Appointments fetched successfully',
      success: true,
      data: appointment.length,
    });
  } catch (error) {
    console.log (error);
    res.status (500).send ({
      message: 'Error',
      success: false,
      error,
    });
  }
});






module.exports = router;
