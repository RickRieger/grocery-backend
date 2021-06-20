var express = require("express");
var router = express.Router();
const {
  getAllGroceryItems,
  createGroceryItem,
  updateGrocery,
  updateGroceryPurchased,
  deleteGrocery,
  sortGroceryByDate,
  sortGroceryByPurchased,
} = require("./controller/groceryController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(true);
});
router.get("/get-all-grocery-items", getAllGroceryItems);
router.post("/create-grocery-item", createGroceryItem);
router.put("/update-grocery-by-id/:id", updateGrocery);
router.put("/update-purchased-by-id/:id", updateGroceryPurchased);
router.delete("/delete-grocery-by-id/:id", deleteGrocery);
router.get("/get-grocery-by-sort", sortGroceryByDate);
router.get("/get-grocery-by-purchased", sortGroceryByPurchased);
module.exports = router;
