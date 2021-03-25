const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

exports.protect = asyncHandler(async (req, res) => {
	let token

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1]

			const decoded = jwt.verify(token, process.env.JWT_TOKEN)

			req.user = await (await User.findById(decoded.id)).isSelected('-password')

			next()
		} catch (error) {
			console.error(error)
			res.status(401).json({ message: 'You cannot PASS!, token failed' })
		}
	}

	if (!token) {
		res.status(401).json({ message: 'You cannot PASS!, no token' })
	}
})

exports.admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error('Not authorized,no admin')
	}
}
