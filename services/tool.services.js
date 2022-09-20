const Tool = require("../models/index");

const getToolsService = async () => {
	const tools = await Tool.find({});
	return tools;
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
