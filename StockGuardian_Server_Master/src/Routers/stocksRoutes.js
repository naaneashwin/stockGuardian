const express = require("express");
const router = express.Router();

const {
  getAllStocks,
  getStockById,
  deleteStockById,
  updateStockById,
  replaceStock,
  deleteAllStocksOfUserByUserId,
} = require("../Controllers/stocksController");
const { verifyStockAndCreate } = require("../Services/createStockService");
const { isValidObjectId } = require("mongoose");
const validateUser = require("../validateUserHandler");

router.param("id", (req, res, next, id) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(500);
    throw new Error('Entered id is Invalid');
  }
  next();
});

router.use(validateUser);

router
  .route("/")
  .get(getAllStocks)
  .put(replaceStock);
router.route('/create').post(verifyStockAndCreate);
router.delete("/deleteAllUserStocks", deleteAllStocksOfUserByUserId);
router
  .route("/:id")
  .get(getStockById)
  .delete(deleteStockById)
  .patch(updateStockById);

module.exports = router;
