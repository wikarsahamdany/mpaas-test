const jwt = require('jsonwebtoken')
const SECRET = "123qwe"
const REFRESH_SECRET = "456rty"

module.exports = {
    createToken: (payload) => jwt.sign(payload, SECRET , {
        expiresIn : 120
    }),
    verifyToken: (token) => jwt.verify(token, SECRET),
    createRefreshToken: (payload) => jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: 600
    }),
    verifyRefreshToken: (refreshToken) => jwt.verify(refreshToken, REFRESH_SECRET),
}