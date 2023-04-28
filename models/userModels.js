const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {//changed on january 12
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      default: "1/1/2000",
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    streamToken: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
    devices: {
      type: Array,
      default: "",
    },
    phr: {
      type: Array,
      default: [],
    },
    rtcToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
