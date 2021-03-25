const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/User')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

exports.authUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body

	const user = await User.findOne({ username })

	if (user && (await user.matchPassword(password))) {
		res.status(200).json({
			_id: user.id,
			username: user.username,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(401)
		throw new Error('Invalid username or password')
	}
})

// @desc    Register a new user
// @route   POST /api/users/create
// @access  Public

exports.registerUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body

	const userExists = await User.findOne({ username })

	if (userExists) {
		res.status(400).json({ message: 'User already exists' })
	}

	const user = await User.create({
		username,
		password,
	})

	if (user) {
		res.status(201).json({
			_id: user.id,
			username: user.username,
			isAdmin: user.isAdmin,
			token: generateToken(user.id),
		})
	} else {
		res.status(400).json({ message: 'Invalid user data' })
	}
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)

	if (user) {
		res.status(200).json({
			_id: user.id,
			username: user.username,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404).json({ messaage: 'User not found' })
	}
})

// @desc    Update user profile
// @route   PUT /api/users/profile/update
// @access  Private

exports.updateProfile = asyncHandler(async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user.id)

	if (user) {
		user.username = req.body.username || user.username
		if (req.body.password) {
			user.password = req.body.password
		}

		const updateUser = await user.save()

		res.status(201).json({
			_id: updateUser.id,
			username: updateUser.username,
			isAdmin: updateUser.isAdmin,
			token: generateToken(updateUser.id),
		})
	} else {
		res.status(404).json({ message: 'User not found' })
	}
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

exports.getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})
	res.status(200).json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

exports.deleteUser = asyncHandler(async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: 'Delete User' })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red.bold })
	}
})

exports.getUserById = asyncHandler(async (req, res) => {
	const user = await (await User.findById(req.params.id)).isSelected('-password')

	if (user) {
		res.status(200).json(user)
	} else {
		res.status(404).json({ message: 'User not found' })
	}
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

exports.updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		user.username = req.body.username || user.username
		user.isAdmin = req.body.isAdmin

		const updateUser = await user.save()

		res.status(201).json({
			_id: updateUser.id,
			username: updateUser.username,
			isAdmin: updateUser.isAdmin,
		})
	} else {
		res.status(404).json({ message: 'User not found' })
	}
})
