const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const authMiddleware = require("../middleware/authMiddleware");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const moment = require ('moment');

const {
  sendVerificationEmail,
  sendForgotPasswordEmail,
} = require("../config/sendEmail");

const emailValidation = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
);

const passwordValidation = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,32})"
);

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error fetching Doctors List", success: false, error });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error fetching Users List", success: false, error });
  }
});

router.post("/change-doctor-status", authMiddleware, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      status,
    });
    //Find user first
    const user = await User.findOne({ _id: doctor.userId });
    //Fetch unseen notifications
    const unseenNotifications = user.unseenNotifications;
    //Push notifications to user
    unseenNotifications.push({
      type: "new-doctor-request-changed",
      message: `You have now activated your doctor account.`,
      onClickPath: "/notifications",
    });
    // user.isDoctor = status === "Approved" ? true : false;
    user.isDoctor =  true;
    await user.save();

    res.status(200).send({
      message: "Doctor status updated successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error updating status", success: false, error });
  }
});

router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    //finds if user already exists in database by email
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    //checks if there is email, name, and password in the request body
    if (!name || !email || !password) {
      return res
        .status(200)
        .json({ message: "Please fill in all fields", success: false });
    }

    //The RFC 5322 Format is an Internet Message Format (classic format of an email message).
    //The RFC 5322 only dictates what should be allowed - it isn't an expression itself.
    if (!emailValidation.test(email)) {
      return res
        .status(200)
        .json({ message: "Please enter a valid email", success: false });
    }

    if (password !== confirmPassword) {
      return res.status(200).send({
        message: "Passwords do not match",
        success: false,
      });
    }

    if (!passwordValidation.test(password)) {
      return res.status(200).json({
        message:
          "Password must have at least 1 digit, 1 lowercase character, 1 uppercase character, special character, and atleast 8 characters in length, but not more than 20",
        success: false,
      });
    }

    // hashes the password
    const hash = await argon2.hash(password);

    // creates a new user
    const newuser = new User({ name, email, password: hash });

    //const newuser = new User({ name, email, password, confirmPassword});
    newuser.isAdmin = true;
    await newuser.save();

    const token = jwt.sign({ email: newuser.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const link = "https://fuentes-clinic-website.onrender.com/verify?token=" + token;

    const sendMail = await sendVerificationEmail(newuser.email, link);

    if (sendMail) {
      res.status(201).send({
        message:
          "User created successfully. Error in sending verification link",
        success: true,
      });
    } else {
      res
        .status(201)
        .send({ message: "Admin created successfully!", success: true });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating admin account", success: false, error });
  }
});

router.post("/register-doctor", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    //finds if user already exists in database by email
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    //checks if there is email, name, and password in the request body
    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(200)
        .json({ message: "Please fill in all fields", success: false });
    }

    //The RFC 5322 Format is an Internet Message Format (classic format of an email message).
    //The RFC 5322 only dictates what should be allowed - it isn't an expression itself.
    if (!emailValidation.test(email)) {
      return res
        .status(200)
        .json({ message: "Please enter a valid email", success: false });
    }

    if (password !== confirmPassword) {
      return res.status(200).send({
        message: "Passwords do not match",
        success: false,
      });
    }

    if (!passwordValidation.test(password)) {
      return res.status(200).json({
        message:
          "Password must have at least 1 digit, 1 lowercase character, 1 uppercase character, special character, and atleast 8 characters in length, but not more than 20",
        success: false,
      });
    }

    // hashes the password
    const hash = await argon2.hash(password);

    // creates a new user
    //const newuser = new Doctor({ firstName, email, password: hash });

    const newuser = new User({ name, email, password: hash});
    await newuser.save();

    const token = jwt.sign({ email: newuser.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const link = "https://fuentes-clinic-website.onrender.com/verify?token=" + token;

    const sendMail = await sendVerificationEmail(newuser.email, link);

    if (sendMail) {
      res.status(201).send({
        message:
          "User created successfully. Error in sending verification link",
        success: true,
      });
    } else {
      res
        .status(201)
        .send({ message: "Doctor created successfully!", success: true });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "Error creating doctor account",
        success: false,
        error,
      });
  }
});

router.post ('/update-patient-profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate (
      {_id: req.body._id},
      req.body
    );

    res.status (200).send ({
      success: true,
      message: 'Updated successfully',
      data: user,
    });
  } catch (error) {
    res.status (500).send ({
      message: 'Error updating user profile',
      success: false,
      error,
    });
  }
});


router.post ('/get-accepted-appointments', async (req, res) => {
  try {
    // const doctor = await Doctor.findOne ({_id: req.body.doctorId});
    const appointments = await Appointment.find ({
      // doctorId: "6332d5608231d41a72504a13",
      status: 'approved',
    }).sort ({date: -1});
    res.status (200).send ({
      message: 'Pending Appointments fetched successfully',
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log (error);
    res.status (500).send ({
      message: 'Error fetching appointments',
      success: false,
      error,
    });
  }
});
router.post ('/get-history-appointments', async (req, res) => {
  try {
    // const doctor = await Doctor.findOne ({_id: req.body.doctorId});
    const appointments = await Appointment.find ({
      // doctorId: "6332d5608231d41a72504a13",
      status: {$in: ['completed', 'absent', 'rejected']},
    }).sort ({date: -1}); // Sorting in ascending order of the date field

    res.status (200).send ({
      message: 'Completed Appointments fetched successfully',
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error (error);
    res.status (500).send ({
      message: 'Error fetching appointments',
      success: false,
      error: 'An error occurred while fetching appointments',
    });
  }
});






module.exports = router;
