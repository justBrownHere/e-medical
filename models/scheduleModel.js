const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    currentNumber: {
      type: Number,
      default: 0,
    },
    maxNumber: {
      type: Number,
      default: 10,
    },
    date: {
      type: String,
      require: [true, "Invalid date schedule!"],
    },
    time: {
      type: Schema.Types.Object,
      ref: "Allcode",
    },
    doctorId: {
      type: Schema.Types.Object,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
