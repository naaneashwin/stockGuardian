const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stocksCollectionName = 'stocks';

const buyOrSellSchema = new Schema({
    units: {type: Number},
    on: {type: Date},
    at: {type: Number},
});

const averageSchema = new Schema({
    purchase: {type: Number},
    sell: {type: Number},
});

const stockSchema = new Schema({
    name: {type: String, required: true},
    exchange: {type: String, required: true},
    purchase: {type: [buyOrSellSchema], required: true},
    sell: {type: [buyOrSellSchema]},
    average: {type: averageSchema, required: true},
    profit: {type: Number},
    profitPercentage: {type: Number},
    userId: {type: mongoose.SchemaTypes.ObjectId, required: true}
}, {timestamps: true});

const stocksModel = mongoose.model(stocksCollectionName, stockSchema,);

module.exports = stocksModel;