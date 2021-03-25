const Apartment = require('../models/Apartment')
const asyncHandler = require('express-async-handler')

// @desc    Fetch all apartments
// @route   GET /api/aparments
// @access  Public

exports.getAllApartments = asyncHandler(
	async(async (req, res) => {
		try {
			const aparments = await (await Apartment.findById()).populated('user')
			res.status(200).json({ aparments })
		} catch (error) {
			res.status(400).json({ message: `${error}`.red.bold })
		}
	})
)

// @desc    Fetch single apartment
// @route   GET /api/aparments
// @access  Private

exports.getApartment = asyncHandler(async (req, res) => {
	try {
		const apartment = await (await Apartment.findById(req.params.id)).populated(
			'user'
		)
		res.status(200).json({ apartment })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red.bold })
	}
})

// @desc    Create apartment
// @route   POST /api/aparments/create
// @access  Private/Admin

exports.createApartment = asyncHandler(async (req, res) => {
	try {
		const {
			numeroDepartamento,
			contacto,
			mantenimiento,
			statusAdeudos,
			adeudo,
		} = req.body
		const user = req.user.id

		const apartment = await Apartment.create({
			numeroDepartamento,
			contacto,
			mantenimiento,
			statusAdeudos,
			adeudo,
			user,
		})

		res.status(201).json({ apartment })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red.bold })
	}
})

exports.updateApartment = asyncHandler(async (req, res) => {
	try {
		const { contacto, mantenimiento, statusAdeudos, adeudo } = req.body
		const apartment = await Apartment.findByIdAndUpdate(req.params.id, {
			contacto,
			mantenimiento,
			statusAdeudos,
			adeudo,
		})
		res.status(200).json({ apartment })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red.bold })
	}
})
