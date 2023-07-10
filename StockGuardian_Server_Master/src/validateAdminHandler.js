const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const usersModel = require('./Models/usersModel');

const validateAdmin = asyncHandler(async(req, res, next) => {
    const user = await usersModel.findById(req.userDetails.id);
    if (!user.isAdmin) {
        res.status(403);
        res.send({message: 'This account do not have admin access'});
    }
    req.userDetails.isAdmin = true;
    next();
})

module.exports = validateAdmin;