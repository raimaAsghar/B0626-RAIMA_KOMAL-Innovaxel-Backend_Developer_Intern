const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/error");
const eventRoutes = require("./routes/event.routes");
const registrationRoutes = require("./routes/registration.routes");

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use(errorHandler);

module.exports = app;