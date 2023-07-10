const bcrypt = require('bcryptjs');
const { createUser, loginUser } = require('../Controllers/usersController');
const usersModel = require('../Models/usersModel');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res, next) => {
    const {
        username,
        password,
        email,
        phone
    } = req.body;
    let customMessage;
    let users;
    console.log('sjiaca asdasd ', username, email, password)
    // let users = await usersModel.find({$or: [{"contactInfo.email": email}, {username: username}, {"contactInfo.phone" : phone}]})
    users = await usersModel.exists({email: email});
    if (users) {
        customMessage = 'Email is already registered';
    } else {
        users = await usersModel.exists({phone : phone});
        if (users) {
            customMessage = 'Phone number is already registered';
        } else {
            users = await usersModel.exists({username: username});
            if (users) {
                customMessage = 'Username is already taken';
            }
        }
    }
    if (customMessage) {
        res.status(403);
        throw new Error(customMessage);
    }
    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    req.body.password = encryptedPassword;
    let newUser = await createUser(req, res);
    console.log('new user', newUser);
})
// async function registerUser

const loginUserService = asyncHandler(async(req, res, next) => {
    const { email, password, username } = req.body;
    if (!(username || email)) {
        res.status(400);
        throw new Error("Please provide a valid Username or Email");
    };
    if (!password) {
        res.status(400);
        throw new Error("Password is mandatory!!");
    }
    await loginUser(req, res, next);
});

module.exports = {
    registerUser,
    loginUserService,
}