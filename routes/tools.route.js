const express = require("express");
const {
	getTools,
	createTool,
	getToolDetails,
} = require("../controllers/tools.controller");
const router = express.Router();

router.route("/tools").get(getTools).post(createTool);

router.route("/tools/:id").get(getToolDetails);

module.exports = router;
