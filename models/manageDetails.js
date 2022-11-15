const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    contentHTML: {
      type: String,
      required: true,
      default: "",
    },
    contentMarkdown: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    // specialtyId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Users'
    // },
    // clinicId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Users'
    // },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Markdown", detailSchema);
