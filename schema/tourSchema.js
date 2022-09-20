const mongoose = require("mongoose");

// tour SCHEMA DESING
const tourSchema = mongoose.Schema(
	{
		viewesCount: {
			type: Number,
			required: [true, "Please provide a viewesCount of 0"],
		},
		name: {
			type: String,
			required: [true, "Please provide a name for this tour"],
			trim: true,
			unique: [true, "tour must be unique"],
			minLenght: [3, "Name must be al last 3 characters"],
			maxLenght: [100, "Name is too large"],
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: [true, "Please provide a price for this tour"],
			min: [0, "Price can't be negative."],
		},
		adult: {
			type: Number,
			required: [true, "Please provide a adult for this tour"],
			min: [0, "adult can't be negative."],
		},
		status: {
			type: String,
			enum: {
				values: ["active", "comeing soon"],
				message: "status can't be {VALUE}",
			},
		},
		date: {
			type: Date,
			required: [true, "Please provide a date for tour"],
		},
		time: {
			type: String,
			required: [true, "Please provide a time for tour"],
		},
	},
	{
		timestamps: true,
	}
);

// MONGOOSE MIDDLEWARES FOR SAVEING DATA: PRE / POST
// tourSchema.pre("save", function (next) {
// 	if (this.viewesCount || !this.viewesCount) {
// 		this.viewesCount = 0;
// 	}

// 	next();
// });

module.exports = tourSchema;
