const Tour = require("../models/index");

// GET ALL TOURS
const getToursService = async (filters, queries) => {
	const { skip, limit = 5, fields, sortBy } = queries;

	const tours = await Tour.find(filters)
		.skip(skip)
		.limit(limit)
		.select(fields)
		.sort(sortBy);

	const totalTours = await Tour.countDocuments(filters);
	const pageCount = Math.ceil(totalTours / limit);

	return { totalTours, pageCount, tours };
};

// GET A SINGLE TOUR
const getTourDetailService = async id => await Tour.find({ _id: id });

// CREATE A TOUR
const createTourService = async data => await Tour.create(data);

// UPDATE A TOUR BY ID
const updateTourByIdService = async (id, data) => {
	const tour = await Tour.findOne({ _id: id });
	const result = await tour.set(data).save();
	return result;
};

// GET TRENDING TOURS
const getTrendingTourService = async () => {
	const tours = await Tour.find({}).sort("-viewesCount").limit(3);
	return tours;
};

module.exports = {
	getToursService,
	getTourDetailService,
	createTourService,
	updateTourByIdService,
	getTrendingTourService,
};
