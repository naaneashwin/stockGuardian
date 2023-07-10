const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateUser = asyncHandler(async(req, res, next) => {
    const token = req.cookies['jwt'];
    if (!token) {
        res.status(403);
        throw new Error('JWT Token is invalid');
    }
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            throw new Error('User is unauthorized');
        }
        const {email, username} = req.body;
        if (email) {
            if (decoded.userDetails.email !== email) {
                res.status(403);
                throw new Error(`Email ${email} donot match the token`)
            }
        }
        if (username) {
            if (decoded.userDetails.username !== username) {
                res.status(403);
                throw new Error(`Username ${username} donot match the token`)
            }
        }
        req.userDetails = decoded.userDetails;
        next();
    })
})

module.exports = validateUser;