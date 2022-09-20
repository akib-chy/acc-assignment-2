const Tool = require("../models/index");

const getToolsService = async (filters, queries) => {
	const { skip, limit = 10, fields, sortBy } = queries;

	const tools = await Tool.find(filters)
		.skip(skip)
		.limit(limit)
		.select(fields)
		.sort(sortBy);

	const totalTools = await Tool.countDocuments(filters);
	const pageCount = Math.ceil(totalTools / limit);

	return { totalTools, pageCount, tools };
};

const getToolDetailService = async id => await Tool.find({ _id: id });

const createToolService = async data => {
	const result = await Tool.create(data);
	return result;
};

module.exports = {
	getToolsService,
	getToolDetailService,
	createToolService,
};
