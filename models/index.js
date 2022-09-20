const mongoose = require("mongoose");
const tourSchema = require("../schema/tourSchema");

// TOUR MODEL
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
