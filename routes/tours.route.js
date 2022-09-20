const express = require("express");
const {
	createTour,
	getTours,
	getTourDetails,
	updateTourById,
} = require("../controllers/tours.controller");
const router = express.Router();

router.route("/tours").get(getTours).post(createTour);
router.route("/tours/:id").get(getTourDetails);
router.route("/tour/:id").patch(updateTourById);

module.exports = router;
