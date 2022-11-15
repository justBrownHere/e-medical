const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const doctorInforSchema = new mongoose.Schema(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    priceId: {
      type: Schema.Types.ObjectId,
      ref: "Allcode",
    },
    provinceId: {
      type: Schema.Types.ObjectId,
      ref: "Allcode",
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Allcode",
    },
    specialtyId: {
      type: Schema.Types.ObjectId,
      ref: "Specialty",
    },
    clinicId: {
      type: Schema.Types.ObjectId,
      ref: "Clinic",
    },
    addressClinic: {
      type: String,
      require: true,
    },
    nameClinic: {
      type: String,
      require: true,
    },
    note: {
      type: String,
      require: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DoctorInfor", doctorInforSchema);
