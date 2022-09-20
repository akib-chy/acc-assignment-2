const {
	createToolService,
	getToolsService,
	getToolDetailService,
} = require("../services/tool.services");

// GET ALL TOOLS
const getTools = async (req, res, next) => {
	try {
		const tools = await getToolsService();

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
