const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: Date,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
  },
  
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
