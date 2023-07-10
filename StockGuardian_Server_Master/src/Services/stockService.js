const stocksModel = require("../Models/stocksModel");

async function buildUpdatedStocksModel(req, res, next) {
    const oldStock = await stocksModel.findById(req.params.id);
    if (!oldStock) {
        res.status(404);
        throw new Error('Stock record not found in database');
    }
    const {
        name,
        exchange,
        purchase,
        sell,
        average,
        profit,
        profitPercentage,
        // userId
    } = req.body;
    name ? oldStock.name = name : '';
    exchange ? oldStock.exchange = exchange : '';
    profit ? oldStock.profit = profit : '';
    profitPercentage ? oldStock.profitPercentage = profitPercentage : '';
    // userId ? oldStock.userId = userId : '';
    purchase ? oldStock.purchase = purchase : '';
    sell ? oldStock.sell = sell : '';
    average ? oldStock.average = average : '';

    return oldStock;
}

function applyStockFilters(req, res, next) {
    const filtersQueryObject = {};
    if (req.header('filtersPresent')) {
        const {
            name,
            exchange,
            // purchase,
            // sell,
            averagePurchase,
            averageSell,
            profit,
            profitPercentage
        } = req.query;
        name ? filtersQueryObject.name = name : '';
        exchange ? filtersQueryObject.exchange = exchange : '';
        averagePurchase ? filtersQueryObject["average.purchase"] = averagePurchase : '';
        averageSell ? filtersQueryObject["average.sell"] = averageSell : '';
        profit ? filtersQueryObject.profit = profit : '';
        profitPercentage ? filtersQueryObject.profitPercentage = profitPercentage : '';
        filtersQueryObject.userId = req.userDetails.id; // from jwt token
    }
    return filtersQueryObject;
}

module.exports = {
    buildUpdatedStocksModel,
    applyStockFilters
}