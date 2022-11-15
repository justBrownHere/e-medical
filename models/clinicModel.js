const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    descriptionHTML: {
      type: String,
      require: true,
    },
    descriptionMarkdown: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clinic", clinicSchema);
