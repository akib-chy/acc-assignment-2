const Tour = require("../models/index");

const getToursService = async (filters, queries) => {
	const { skip, limit = 10, fields, sortBy } = queries;

	const tours = await Tour.find(filters)
		.skip(skip)
		.limit(limit)
		.select(fields)
		.sort(sortBy);

	const totalTours = await Tour.countDocuments(filters);
	const pageCount = Math.ceil(totalTours / limit);

	return { totalTours, pageCount, tours };
};

const getTourDetailService = async id => await Tour.find({ _id: id });

const createTourService = async data => {
	const result = await Tour.create(data);
	return result;
};

module.exports = {
	getToursService,
	getTourDetailService,
	createTourService,
};
