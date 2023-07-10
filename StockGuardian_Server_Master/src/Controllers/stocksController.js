const stocksModel = require('../Models/stocksModel');
const { isValidObjectId } = require('mongoose');
const { buildUpdatedStocksModel, applyStockFilters } = require('../Services/stockService');
const asyncHandler = require('express-async-handler');

const getAllStocks = asyncHandler(async (req, res, next) => {
    // Pagination
    const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;
    const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 4;
    const skip = pageNumber * limit;

    // Filter
    const filtersQueryObject = applyStockFilters(req, res, next);
    const stocks = await stocksModel.find(filtersQueryObject).sort({createdAt: -1}).skip(skip).limit(limit);
    if (stocks) {
        res.status(200).send(stocks);
    } else {
        res.status(500);
        throw new Error('Could not fetch stocks data')
    }
});

const getStockById = asyncHandler(async (req, res, next) => {
    const stock = await stocksModel.findById(req.params.id);
    if (!stock) {
        res.status(404);
        throw new Error('Stock record not found in database');
    }
    res.status(200).send(stock);
});

const updateStockById = asyncHandler(async (req, res, next) => {
    const oldStock = await buildUpdatedStocksModel(req, res, next);
    const updatedStock = await oldStock.save();
    if (updatedStock) {
        res.status(200).send(updatedStock);
    } else {
        res.status(500);
        throw new Error('Could not update the stock')
    }
});

const deleteStockById = asyncHandler(async (req, res, next) => {
    const stock = await stocksModel.findByIdAndDelete(req.params.id);
    if (!stock) {
        res.status(404);
        throw new Error('Stock record not found in database');
    }
    res.status(200).send(stock);
});

const replaceStock = asyncHandler(async (req, res, next) => {
    const stock = await stocksModel.findOneAndReplace({id: req.params.id}, req.body, {new: true});
    res.status(200).send(stock);
});

const createStock = asyncHandler(async (req, res, next) => {
    const stock = await stocksModel.create(req.body);
    if (stock) {
        res.status(201).send({
            message: 'Successfully created',
            data: stock,
        });
        return stock;
    } else {
        res.status(500);
        throw new Error('Could not create stock')
    }
});

const deleteAllStocksOfUserByUserId = asyncHandler(async (req, res, next) => {
    if (!isValidObjectId(req.userDetails.id)) {
        res.status(500);
        throw new Error('Entered id is Invalid');
    }
    const allStocksOfUser = await stocksModel.deleteMany({userId: req.userDetails.id});
    if (allStocksOfUser) {
        res.status(200).send({message: "All stocks of the user deleted successfully"});
    } else {
        res.status(500);
        throw new Error('Could not delete stocks data');
    }
});


module.exports = {
    getAllStocks,
    getStockById,
    createStock,
    deleteStockById,
    replaceStock,
    updateStockById,
    deleteAllStocksOfUserByUserId
};