// Importing required modules
require('dotenv').config()
const express = require('express')
const { authenticateToken } = require('./authentication')

//Initializing the API
const port = process.env.PORT || 3000
const app = express()
app.use(express.json())

//Defining routes
const userRouter = require('./routes/users')
const contactsRouter = require('./routes/contacts')

//Connectinng routes to the API
app.use('/users', userRouter)
app.use('/contacts', authenticateToken, contactsRouter)

//Tesing of server
app.get('/', (req, res) => { res.send("Welcome to my API!") })

//Opening the server
app.listen(port, () => { console.log('Server started', port) })