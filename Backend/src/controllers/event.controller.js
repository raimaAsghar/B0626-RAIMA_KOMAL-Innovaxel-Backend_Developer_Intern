const Event = require("../models/event.model");
const Registration = require("../models/registration.model");

/**
 * @description Controller to create a new event.
 */

async function createEvent(req, res) {
  const { name, totalSeats, date } = req.body;

  if (!name || !totalSeats || !date)
    return res.status(400).json({ message: "All fields required" });

  if (totalSeats < 1)
    return res.status(400).json({ message: "Seats should be greater than 0" });

  if (new Date(date) <= new Date())
    return res.status(400).json({ message: "Event date must be in the future" });

  try {
    const event = await Event.create({ 
      name, totalSeats, availableSeats: totalSeats, date 
    });

    res.status(201).json(event);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description Controller to get all events.
 */

async function getEvents(req, res) {
  const { upcoming } = req.query;
  const filter = {};

  if (upcoming === "true") filter.date = { $gt: new Date() };

  try {
    const events = await Event.find(filter).sort({ date: 1 });

    const result = await Promise.all(events.map(async (e) => {
      const totalRegistrations = await Registration.countDocuments({ eventId: e._id, status: "active" });
      return { ...e.toObject(), totalRegistrations };
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @description Controller to get event statistics.
 */

async function getStats(req, res, next) {
  try {
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({ date: { $gt: new Date() } });
    const totalRegistrations = await Registration.countDocuments({ status: "active" });
    const seatsResult = await Event.aggregate([
      { $group: { _id: null, totalAvailable: { $sum: "$availableSeats" } } }
    ]);
    const availableSeats = seatsResult[0]?.totalAvailable || 0;

    res.json({ totalEvents, upcomingEvents, totalRegistrations, availableSeats });
  } catch (err) {
    next(err);
  }
};

module.exports={
  createEvent,
  getEvents,
  getStats
}