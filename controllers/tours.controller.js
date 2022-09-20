const {
	getToursService,
	getTourDetailService,
	createTourService,
	updateTourByIdService,
	getTrendingTourService,
	getCheapestTourService,
} = require("../services/tours.services");

// GET ALL TOURS
const getTours = async (req, res, next) => {
	try {
		let filters = { ...req.query };
		const excludeFields = ["sort", "page", "limit"];
		excludeFields.forEach(field => delete filters[field]);

		let filtersString = JSON.stringify(filters);
		filtersString = filtersString.replace(
			/\b(gt|gte|lt|lte)\b/g,
			match => `$${match}`
		);
		filters = JSON.parse(filtersString);

		// QUERIES
		const queries = {};

		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			queries.sortBy = sortBy;
		}

		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			queries.fields = fields;
		}

		if (req.query.page || req.query.limit) {
			const { page = 1, limit = 5 } = req.query;

			const skip = (page - 1) * Number(limit);
			queries.skip = skip;
			queries.limit = Number(limit);
		}

		const tours = await getToursService(filters, queries);

		res.status(200).json({
			status: "Success",
			data: tours,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Can't get tours",
			error: error.message,
		});
	}
};

// GET TOUR DETAILS
const getTourDetails = async (req, res, next) => {
	const { id } = req.params;

	try {
		const tour = await getTourDetailService(id);

		res.status(200).json({
			status: "Success",
			data: tour,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Can't get tour details",
			error: error.message,
		});
	}
};

// CREATE A TOUR
const createTour = async (req, res, next) => {
	try {
		const tour = await createTourService(req.body);

		res.status(200).json({
			status: "success",
			message: "tour inserted successfully",
			data: tour,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Data is't inserted",
			error: error.message,
		});
	}
};

// UPDATE A TOUR
const updateTourById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const tour = await updateTourByIdService(id, req.body);

		res.status(200).json({
			status: "success",
			message: "Updated successfully",
			data: tour,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Data is't updated",
			error: error.message,
		});
	}
};

// GET TRENDING TOUR
const getTrendingTour = async (req, res, next) => {
	try {
		const tours = await getTrendingTourService();

		res.status(200).json({
			status: "success",
			data: tours,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Can't get trending tour",
			error: error.message,
		});
	}
};

// GET CHEAPEST TOUR
const getCheapestTour = async (req, res, next) => {
	try {
		const tours = await getCheapestTourService();

		res.status(200).json({
			status: "success",
			data: tours,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Can't get cheapest tour",
			error: error.message,
		});
	}
};

module.exports = {
	getTours,
	getTourDetails,
	createTour,
	updateTourById,
	getTrendingTour,
	getCheapestTour,
};
