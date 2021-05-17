const jwt = require('jsonwebtoken');

/**
 * Function to authenticate user either after registration or after login, providing the JWT token
 * 
 * @param {JSON} userBody - given by the body request that holds user information such as email and password
 * @param {string} userID - that is automatically assigned by mongoDB
 * @returns {string} access token needed for creating contacts
 */
const authenticateUser = (userBody, userID) => {
    var user = Object.assign(userBody)
    user.id = userID
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
    return accessToken
}

/**
 * Middleware function needed for authentication of posting/listing contacts that verifies JWT token
 * provided in the header
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next - that proceeds to the route
 * @returns 
 */
const authenticateToken = (req, res, next) => {
    const token = req.header('authorization');
    if (token == null) return res.sendStatus(403)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        req.auth = true
        next()
    })
}

exports.authenticateUser = authenticateUser
exports.authenticateToken = authenticateToken

