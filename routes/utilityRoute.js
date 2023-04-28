require("dotenv").config();
const express = require("express");
const Message = require("../models/msgSchema");
const User = require("../models/userModels");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const StreamChat = require("stream-chat").StreamChat;
// const { connect } = require("getstream");
// const crypto = require("crypto");

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

router.post("/message", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    // creates a new user
    const sendMsg = new Message({
      name: name,
      email: email,
      message: message,
    });

    await sendMsg.save();
    res.status(200).json("Message sent");
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Message not sent", success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // change if error
    const user = await User.findOne({ email });
    const userId = user._id.toString();
    const name = user?.name;
    //for stream chat
    const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
    const streamToken = serverClient.createToken(userId);

    if (!email || !password) {
      return res.status(200).json({ message: "Please fill in all fields", success: false });
    }

    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }

    if (user.verified === "false") {
      return res.status(200).send({
        message: "Email not verified",
        success: false,
      });
    }

    const valid = await argon2.verify(user.password, req.body.password);
    if (!valid) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    } else if (user.verified === false) {
      return res.status(200).send({
        message: "Email not verified",
        success: false,
      });
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name, verified: user.verified },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).send({
        message: "Login successful",
        success: true,
        //token,
        token,
        streamToken,
        userId,
        name,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error logging in",
      success: false,
      error,
    });
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // change if error
//     const user = await User.findOne({ email });
//     const userId = user._id.toString();
//     const name = user?.firstName;

//     //for stream chat
//     const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
//     const streamToken = serverClient.createToken(userId);

//     if (!email || !password) {
//       return res.status(200).json({ message: "Please fill in all fields", success: false });
//     }

//     if (!user) {
//       return res.status(400).send({
//         message: "User not found",
//         success: false,
//       });
//     }

//     if (user.verified === "false") {
//       return res.status(200).send({
//         message: "Email not verified",
//         success: false,
//       });
//     }


//     const valid = await argon2.verify(user.password, req.body.password);
//     if (!valid) {
//       return res.status(200).send({
//         message: "Invalid password",
//         success: false,
//       });
//     } else if (user.verified === false) {
//       return res.status(200).send({
//         message: "Email not verified",
//         success: false,
//       });
//     } else {
//       const token = jwt.sign(
//         { id: user._id, email: user.email, name: name, verified: user.verified },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "7d",
//         }
//       );

//       res.status(200).send({
//         message: "Login successful",
//         success: true,
//         token,
//         streamToken,
//         userId,
//         name,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error logging in",
//       success: false,
//       error,
//     });
//   }
// });

//login 2 for doctor
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // change if error
//     const user = await Doctor.findOne({ email });
//     const userId = user._id.toString();
//     const name = user?.firstName;

//     //for stream chat
//     const serverClient = StreamChat.getInstance(api_key, api_secret, app_id);
//     const streamToken = serverClient.createToken(userId);

//     if (!email || !password) {
//       return res.status(200).json({ message: "Please fill in all fields", success: false });
//     }

//     if (!user) {
//       return res.status(400).send({
//         message: "User not found",
//         success: false,
//       });
//     }

//     if (user.verified === "false") {
//       return res.status(200).send({
//         message: "Email not verified",
//         success: false,
//       });
//     }


//     const valid = await argon2.verify(user.password, req.body.password);
//     if (!valid) {
//       return res.status(200).send({
//         message: "Invalid password",
//         success: false,
//       });
//     } else if (user.verified === false) {
//       return res.status(200).send({
//         message: "Email not verified",
//         success: false,
//       });
//     } else {
//       const token = jwt.sign(
//         { id: user._id, email: user.email, name: name, verified: user.verified },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "7d",
//         }
//       );

//       res.status(200).send({
//         message: "Login successful",
//         success: true,
//         token,
//         streamToken,
//         userId,
//         name,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error logging in",
//       success: false,
//       error,
//     });
//   }
// });



module.exports = router;
