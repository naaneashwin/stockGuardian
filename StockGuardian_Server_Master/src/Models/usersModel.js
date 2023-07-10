const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCollectionName = 'users';

const addressSchema = new Schema({
    houseNumber: {type: String, required: true, min: 1},
    addressLine1: {type: String, required: true},
    addressLine2: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipCode: {type: Number, required: true, minLength: 6}
});

// {
//     "username": "naaneashwin",
//     "password": "Test@123",
//     "firstName": "Ashwin",
//     "lastName": "Kumar",
//     "address": {
//         "houseNumber":"405",
//         "addressLine1":"Sriram Nagar 7th Street",
//         "addressLine2":"Near Sai Baba Temple",
//         "city":"Chennai",
//         "state":"Tamilnadu",
//         "country":"India",
//         "zipCode":600089
//     },
//     "email":"naaneashwin@gmail.com",
//     "phone":"98400000"
// }

const usersSchema = new Schema({
    username: {type: String, required: [true, 'Please add the username'], immutable: true, unique: [true, "Username is already taken"]},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: addressSchema, required: true},
    email: {type: String, required: [true, 'Please add the email address'] , lowercase: true, unique: [true, "Email is already used"]},
    phone: {type: String, required: [true, 'Please add the phone number'] ,unique: [true, "Phone number is already used"]},
    isAdmin: {type: Boolean},
}, {timestamps: true});

const usersModel = mongoose.model(userCollectionName, usersSchema);

module.exports = usersModel;