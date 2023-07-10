const usersModel = require("../Models/usersModel");
const { createStock } = require("../Controllers/stocksController");
const { isValidObjectId } = require("mongoose");
const asyncHandler = require('express-async-handler');
const stocksModel = require("../Models/stocksModel");

const verifyStockAndCreate = asyncHandler(async (req, res) => {
    const { exchange, name} = req.body;
    const userId = req.userDetails.id;
        let customMessage;
        // if (!userId) {
        //     customMessage = 'User Id not present in the request';
        // } else
        if (!isValidObjectId(userId)) {
            customMessage = 'Invalid userid in the resource';
        }
        if (customMessage) {
            res.status(403);
            throw new Error(customMessage);
        }
        let existingStocks = await stocksModel.find({$and: [{name: name}, {userId: userId}, {exchange: exchange}]})
        if (existingStocks.length) {
            res.status(404);
            throw new Error(`Stock already exists for ${name}`);
        }
        // let isValidUser = await usersModel.find({_id: userId});
        // if (!isValidUser.length) {
        //     res.status(404);
        //     throw new Error('User doesn\'t exist');
        // }
        req.body.userId = req.userDetails.id;
        let stock = await createStock(req, res);
        console.log('stock created successfully');
});

module.exports = {
    verifyStockAndCreate
}