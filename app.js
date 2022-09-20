const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const tourRoutes = require("./routes/tours.route");
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/", tourRoutes);

app.get("/", (req, res) => {
	res.send(
		"Server is running... please you can request to the /api/tours  route"
	);
});

app.all("*", (req, res) => {
	res.send("Route Not Found");
});

module.exports = app;
