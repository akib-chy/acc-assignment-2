const express = require("express");
const { getTools, createTool } = require("../controllers/tools.controller");
const router = express.Router();

router.route("/tools").get(getTools).post(createTool);

module.exports = router;
