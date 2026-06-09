const Registration = require("../models/registration.model");
const Event = require("../models/event.model");

/**
 * @description Controller to register a user for an event.
*/

async function registerUser(req, res) {
  const { userName, eventId } = req.body;

  if (!userName || !eventId)
    return res.status(400).json({
      message: "userName and eventId are required",
    });

  try {
    const isExist = await Registration.findOne({
      userName,
      eventId,
      status: "active",
    });
    if (isExist)
      return res.status(400).json({ message: "User already exists" });

    const event = await Event.findOneAndUpdate(
      { _id: eventId, availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } },
      { new: true },
    );

    if (!event)
      return res.status(400).json({ message: "No seats available" });

    const registration = await Registration.create({ userName, eventId });
    res.status(201).json({ message: "Registered successfully", registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description Controller to get all active registrations.
 */

async function getRegistrations(req, res, next) {

  try {
    const registrations = await Registration.find({ status: "active" })
      .populate("eventId", "name")
      .sort({ registeredAt: -1 });
    res.json(registrations);

  } catch (err) {
    next(err);
  }
};


/**
 * @description Controller to cancel a registration.
 */

async function cancelRegistration(req, res) {
  const { id } = req.params;

  try {
    const registration = await Registration.findOne({
      _id: id,
      status: "active",
    });

    if (!registration)
      return res.status(404).json({ 
    message: "Active registration not found" 
  });

    registration.status = "cancelled";
    await registration.save();

    // Return seat back
    await Event.findByIdAndUpdate(registration.eventId, {
      $inc: { availableSeats: 1 },
    });

    res.json({ message: "Registration cancelled successfully"});

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};

module.exports={
  registerUser,
  getRegistrations,
  cancelRegistration
}