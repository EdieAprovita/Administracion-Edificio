const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departamentoSchema = new Schema({
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

	mantenimeinto: {
		type: Number,
		required: true,
		default: 0,
	},

	statusAdeudos: {
		type: String,
		required: true,
		enum: ['Adeudos', 'Sin Adeudos'],
		default: 'Sin Adeudos',
	},

	adeudo: {
		type: Number,
		required: true,
	},
})

module.exports = Departamento = mongoose.model('Departamento', departamentoSchema)
