const express = require('express')
const initializeMongoDB = require('../mongoose')
const User = require('../user')
const md5 = require('md5')
const { authenticateUser } = require('../authentication')
const registerUser = require('../registration')

const router = express.Router()

initializeMongoDB()


/**
 * Route action needed to create an user and signing in at the same time
 */
router.post('/', async (req, res) => {
  const userObject = {
    email: req.body.email,
    password: md5(req.body.password) // password encrypted
  }
  try {
    const registeredUser = await registerUser(new User(userObject), res)
    const accessToken = registeredUser && authenticateUser(userObject, registeredUser._id, res)
    res.status(201).json({ registeredUser, accessToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }


})

/**
 * Route action needed to sign in an existing user 
 */
router.post('/login', async (req, res) => {
  const userBody = {
    email: req.body.email,
    password: req.body.password
  }
  try {
    // matching the credentials from the requests to entries in the database and return result (if any)
    const newUser = await User.find({ "email": req.bodAy.email, "password": md5(req.body.password) })
    if (newUser.length > 0) {
      userID = newUser[0]._id
      const accessToken = authenticateUser(userBody, userID)
      res.status(201).json(accessToken)
    } else {
      res.status(400).json({ message: "Invalid credentials!" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


module.exports = router