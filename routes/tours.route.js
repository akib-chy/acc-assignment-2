const express = require("express");
const {
	createTour,
	getTours,
	getTourDetails,
	updateTourById,
	getTrendingTour,
} = require("../controllers/tours.controller");
const viewCounter = require("../middlewares/tour.viewCounter");
const router = express.Router();

router.route("/tours").get(getTours).post(createTour);
router.route("/tours/:id").get(viewCounter, getTourDetails);

router.route("/tour/trending").get(getTrendingTour);
router.route("/tour/cheapest").get(getTrendingTour);
router.route("/tour/:id").patch(updateTourById);

module.exports = router;
