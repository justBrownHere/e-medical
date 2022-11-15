const mongoose = require("mongoose");

const allcodesSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Allcode", allcodesSchema);
