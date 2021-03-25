const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buildingSchema = new Schema(
	{
		mantenimiento: {
			type: Number,
			required: true,
			default: 0,
		},

		gastos: {
			type: String,
			required: true,
			default: 0,
		},

		presupuesto: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = Building = mongoose.model('Building', buildingSchema)
