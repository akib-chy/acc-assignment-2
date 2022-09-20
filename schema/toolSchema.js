const mongoose = require("mongoose");

// TOOL SCHEMA DESING
const toolSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a name for this tool"],
			trim: true,
			unique: [true, "Tool must be unique"],
			minLenght: [3, "Name must be al last 3 characters"],
			maxLenght: [100, "Name is too large"],
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: [true, "Please provide a price for this tool"],
			min: [0, "Price can't be negative."],
		},
		unit: {
			type: String,
			required: true,
			enum: {
				values: ["kg", "pcs"],
				message: "unit value can't be {VALUE}, must be kg/pcs",
			},
		},
		quantity: {
			type: Number,
			required: true,
			min: [0, "Quantity can't be negative."],
			validate: {
				validator: value => {
					const isInteger = Number.isInteger(value);
					if (isInteger) {
						return true;
					} else {
						return false;
					}
				},
			},
			message: "Quantity must be an integer.",
		},
		status: {
			type: String,
			enum: {
				values: ["in-stock", "out-of-stock", "discontinued"],
				message: "status can't be {VALUE}",
			},
		},
	},
	{
		timestamps: true,
	}
);

// MONGOOSE MIDDLEWARES FOR SAVEING DATA: PRE / POST
toolSchema.pre("save", function (next) {
	if (this.quantity === 0) {
		this.status = "out-of-stock";
	}

	next();
});

module.exports = toolSchema;
