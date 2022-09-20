const mongoose = require("mongoose");
const toolSchema = require("../schema/toolSchema");

// TOOL MODEL
const Tool = mongoose.model("Tool", toolSchema);

module.exports = Tool;
