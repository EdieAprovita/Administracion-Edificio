const jwt = require('jsonwebtoken')

const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_TOKEN, {
		expiresIn: '14d',
	})
}

module.exports = generateToken
