const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    priority: {
      type: String,
      required: [true, "Please add Priority"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("goals", goalSchema);
