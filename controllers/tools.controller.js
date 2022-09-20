const {
	createToolService,
	getToolsService,
	getToolDetailService,
} = require("../services/tool.services");

// GET ALL TOOLS
const getTools = async (req, res, next) => {
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
			const { page = 1, limit = 10 } = req.query;

			const skip = (page - 1) * Number(limit);
			queries.skip = skip;
			queries.limit = Number(limit);
		}

		console.log("queries", queries);

		const tools = await getToolsService(filters, queries);

		res.status(200).json({
			status: "Success",
			data: tools,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Can't get tools",
			error: error.message,
		});
	}
};

// GET TOOL DETAILS
const getToolDetails = async (req, res, next) => {
	const { id } = req.params;

	try {
		const tool = await getToolDetailService(id);

		res.status(200).json({
			status: "Success",
			data: tool,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Can't get tool details",
			error: error.message,
		});
	}
};

// CREATE A TOOL
const createTool = async (req, res, next) => {
	try {
		const tool = await createToolService(req.body);

		res.status(200).json({
			status: "success",
			message: "Tool inserted successfully",
			data: tool,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Data is't inserted",
			error: error.message,
		});
	}
};

module.exports = { getTools, getToolDetails, createTool };
