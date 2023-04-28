const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    timings: {
      type: Array,
      required: true,
    },
    // status: {
    //   type: String,
    //   default: "Pending",
    // },
    devices: {
      type: Array,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
