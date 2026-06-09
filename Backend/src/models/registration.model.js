const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },

  status: {
    type: String,
    enum: ["active", "cancelled"],
    default: "active",
  },

  registeredAt: {
    type: Date,
    default: Date.now,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

registrationSchema.index({ userName: 1, eventId: 1, status: 1 }); 

module.exports = mongoose.model("Registration", registrationSchema);
