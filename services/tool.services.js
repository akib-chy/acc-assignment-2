const Tool = require("../models/index");

const getToolsService = async () => {
	const tools = await Tool.find({});
	return tools;
};

const createToolService = async data => {
	const result = await Tool.create(data);
	return result;
};

module.exports = { getToolsService, createToolService };
