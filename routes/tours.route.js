const express = require("express");
const {
	createTour,
	getTours,
	getTourDetails,
} = require("../controllers/tours.controller");
const router = express.Router();

router.route("/tours").get(getTours).post(createTour);

router.route("/tours/:id").get(getTourDetails);

module.exports = router;
