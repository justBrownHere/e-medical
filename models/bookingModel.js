const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    reason: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    statusId: {
      type: Schema.Types.Object,
      ref: "Allcode",
      default: "61526e4e93e8d31f90e6f761",
    },
    date: {
      type: String,
    },
    time: {
      type: Schema.Types.Object,
      ref: "Allcode",
    },
    doctorId: {
      type: Schema.Types.Object,
      ref: "Users",
    },
    patientId: {
      type: Schema.Types.Object,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
