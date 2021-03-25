const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apartmentSchema = new Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},

	numeroDepartamento: {
		type: String,
		required: true,
		unique: true,
	},

	contacto: {
		type: Number,
		required: true,
		unique: true,
	},

	saldo: {
		type: Number,
		required: true,
		default: 0,
	},

	aportaciones: {
		type: Number,
		required: true,
		default: 0,
	},

	adeudos: {
		type: Number,
		required: true,
		default: 0,
	},

	statusAdeudos: {
		type: String,
		required: true,
		enum: ['Adeudo', 'Sin Adeudos'],
		default: 'Sin Adeudos',
	},
})

module.exports = Apartment = mongoose.model('Apartment', apartmentSchema)
