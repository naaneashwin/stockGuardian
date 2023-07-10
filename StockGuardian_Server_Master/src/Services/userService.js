const usersModel = require('../Models/usersModel');
const bcrypt = require('bcryptjs');

async function buildUpdatedUserModel(req, res, next) {
    const oldUser = await usersModel.findById(req.params.id);
    if (!oldUser) {
        throw new Error('User not found in database');
    }
    const {
        username,
        password,
        firstName,
        lastName,
        address,
        email,
        phone
    } = req.body;

    let {
        houseNumber,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zipCode
    } = {};

    if (address) {
        houseNumber = address.houseNumber;
        addressLine1 = address.addressLine1;
        addressLine2 = address.addressLine2;
        city = address.city;
        state = address.state;
        country = address.country;
        zipCode = address.zipCode;
    }
    if (username) {
        throw new Error('username cannot be modified');
    }
    password ? oldUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10)): '';
    firstName ? oldUser.firstName = firstName : '';
    lastName ? oldUser.lastName = lastName : '';
    oldUser.address = {
        houseNumber: houseNumber ? houseNumber : oldUser.address.houseNumber,
        addressLine1: addressLine1 ? addressLine1 : oldUser.address.addressLine1,
        addressLine2: addressLine2 ? addressLine2 : oldUser.address.addressLine2,
        state: state ? state : oldUser.address.state,
        city: city ? city : oldUser.address.city,
        country: country ? country : oldUser.address.country,
        zipCode: zipCode ? zipCode : oldUser.address.zipCode,
    }
    email ? oldUser.email = email : '';
    phone ? oldUser.phone = phone : '';
    return oldUser;
}

function addFilters(req, res, next) {
    const filtersQueryObject = {};
    if (req.header('filtersPresent')) {
        const {
            username,
            password,
            firstName,
            lastName,
            houseNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            zipCode,
            email,
            phone
        } = req.query;
        username ? filtersQueryObject.username = username : '';
        password ? filtersQueryObject.password = password : '';
        firstName ? filtersQueryObject.firstName = firstName : '';
        lastName ? filtersQueryObject.lastName = lastName : '';
        houseNumber ? filtersQueryObject["address.houseNumber"] = houseNumber : '';
        addressLine1 ? filtersQueryObject["address.addressLine1"] = addressLine1 : '';
        addressLine2 ? filtersQueryObject["address.addressLine2"] = addressLine2 : '';
        city ? filtersQueryObject["address.city"] = city : '';
        state ? filtersQueryObject["address.state"] = state : '';
        country ? filtersQueryObject["address.country"] = country : '';
        zipCode ? filtersQueryObject["address.zipCode"] = zipCode : '';
        email ? filtersQueryObject.email = email : '';
        phone ? filtersQueryObject.phone = phone : '';
    }
    return filtersQueryObject;
}

module.exports = {buildUpdatedUserModel, addFilters};