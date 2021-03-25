const express = require('express')
const authroutes = express.Router()
const {
	authUser,
	registerUser,
	getUserProfile,
	updateProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} = require('../controllers/authControllers')

const { protect, admin } = require('../middlewares/authMiddleware')

//USER ROUTES
authroutes.get('/', (protect, admin, getUsers))
authroutes.get('/profile', (protect, getUserProfile))
authroutes.get('/profile/:id', (protect, admin, getUserById))
authroutes.post('/signup', registerUser)
authroutes.post('/login', authroutes)
authroutes.put('/profile/update', (protect, updateProfile))
authroutes.put('/:id',(protect, admin, updateUser))
authroutes.delete('/:id',(protect, admin, deleteUser))

module.exports = authroutes
