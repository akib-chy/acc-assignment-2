const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const toolRoutes = require("./routes/tools.route");
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/", toolRoutes);

app.get("/", (req, res) => {
	res.send(
		"Server is running... please you can request to the /api/tools  route"
	);
});

app.all("*", (req, res) => {
	res.send("Route Not Found");
});

module.exports = app;
