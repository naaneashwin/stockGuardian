const { isValidObjectId } = require('mongoose');
const usersModel = require('../Models/usersModel');
const stocksModel = require('../Models/stocksModel');
const { buildUpdatedUserModel, addFilters } = require('../Services/userService');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// to check all the user names, to make it unique
const getAllUsers = asyncHandler(async (req, res, next) => {
    // Pagination
    const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;
    const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 4;
    const skip = pageNumber * limit;

    // Filter
    const filtersQueryObject = addFilters(req, res, next);
    const users = await usersModel.find(filtersQueryObject).sort({createdAt: -1}).skip(skip).limit(limit);
    if (users) {
        res.status(200).send(users);
    }  else {
        res.status(500);
        throw new Error('Could not fetch the users data');
    }
})

const getUserById = asyncHandler(async (req, res, next) => {
    const user = await usersModel.findById(req.params.id);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(500);
        throw new Error('Could not fetch the userd data');
    }
})

const updateUserById = asyncHandler(async (req, res, next) => {
    let oldUser = await buildUpdatedUserModel(req, res, next);
    const updatedUser = await oldUser.save();
    if (updatedUser) {
        const {
            username,
            firstName,
            lastName,
            address: {
                houseNumber,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                zipCode
            },
            email,
            phone
        } = updatedUser;
        const dataToUser = {
            username,
            firstName,
            lastName,
            address: {
                houseNumber,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                zipCode
            },
            email,
            phone}
        res.status(200).send(dataToUser);
    } else {
        res.status(500);
        throw new Error('Could not update the userd data');
    }
})

const removeUserById = asyncHandler(async (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(500);
        throw new Error('Entered id is Invalid');
    }
    const user = await usersModel.findByIdAndRemove(req.params.id);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(500);
        throw new Error('Could not remove the user');
    }
});

const deleteUserById = asyncHandler(async (req, res, next) => {
    const user = await usersModel.findByIdAndDelete(req.params.id, {new:true});
    const userStocks = await stocksModel.deleteMany({userId: req.params.id});
    res.status(200).send({
        message: 'User and related stocks data deleted'
    });
});

const createUser = asyncHandler(async (req, res, next) => {
    const user = await usersModel.create(req.body);
    const {username, email} = user;
    if (user) {
        res.status(201).send({
            message: 'Successfully Created user',
            username: username,
            email: email,
            _id: user._id,
        });
        // await loginUser(req, res, next);
        // console.log('user logged as well')
        return user;
    } else {
        res.status(500);
        throw new Error('Could not create the user');
    }
})

const loginUser = asyncHandler(async(req, res, next) => {
    const {email, password, username} = req.body;
    console.log('user / email', username, email)
    const user = await usersModel.findOne({$or: [{ email }, { username }]});
    if (!user) {
        res.status(404);
        throw new Error(`No User found with ${email ? email : username}`);
    }
    if (!bcrypt.compareSync(password, user.password)) {
        res.status(400);
        throw new Error('Invalid Password');
    }
    const accessToken = jwt.sign({
        userDetails: {
            username: user.username,
            email: user.email,
            id: user._id
        },
    },
    process.env.AUTH_TOKEN_SECRET,
    {
        expiresIn: '30m'
    });
    if (!accessToken) {
        res.status(500);
        throw new Error("Failed to generate access Token");
    }
    const cookieOptions = {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/'
    }
    res.cookie('jwt', accessToken, cookieOptions);
    res.status(200).send({
        message: `${username ? username : email} logged in successfully`,
        userId: user._id
    });
})

module.exports = {
    getAllUsers, getUserById, removeUserById, deleteUserById, updateUserById, createUser, loginUser
}