
/**
 * Function that registers a user by fetching the request body and persisting it in mongoDB 
 * 
 * @param {object} user - request body
 * @param {object} res - response 
 * @returns {user} - newly saved user
 */
const registerUser = async (user, res) => {
  try {
    const newUser = await user.save()
    return newUser
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = registerUser