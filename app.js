require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const colors = require('colors')
const morgan = require('morgan')

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(x =>
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`.blue.bold
		)
	)
	.catch(err => console.error('Error connecting to mongo'.red.bold, err))

const app_name = require('./package.json').name
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(
	cors({
		credentials: true,
		origin: [process.env.FRONTENDPOINT],
	})
)

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(logger('dev'))

//Constants
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const index = require('./routes/index')
const auth = require('./routes/user-routes')

app.use('/', index)
app.use('/api/users', auth)

// Uncomment this line for production
// app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

module.exports = app
