const Grocery = require("../model/Grocery");

async function getAllGroceryItems(req, res) {
  try {
    let allGroceryItems = await Grocery.find({});
    res.json({ payload: allGroceryItems });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function createGroceryItem(req, res) {
  console.log(req.body);
  try {
    let createdGroceryItem = new Grocery({
      grocery: req.body.grocery,
    });
    let savedGroceryItem = await createdGroceryItem.save();
    res.json({ payload: savedGroceryItem });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function updateGrocery(req, res) {
  try {
    let updatedGrocery = await Grocery.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json({ payload: updatedGrocery });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function updateGroceryPurchased(req, res) {
  try {
    let updatedGroceryDone = await Grocery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ payload: updatedGroceryDone });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function deleteGrocery(req, res) {
  try {
    let deletedGrocery = await Grocery.findByIdAndRemove(req.params.id);
    res.json({ payload: deletedGrocery });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function sortGroceryByDate(req, res) {
  try {
    console.log(req, res)
    let sort = req.query.sort;
    let sortOrder = sort === "desc" ? -1 : 1;
    let foundGrocery = await Grocery.find({}).sort({ Date: sortOrder });
    res.json({ payload: foundGrocery });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function sortGroceryByPurchased(req, res) {
  try {
    
    let isDone = req.query.isPurchased;
    let isPurchasedOrder = isDone === "true" ? true : false;
    let sortByDate = req.query.sort ? req.query.sort : null;
    let finalSort;
    if (!sortByDate) {
      finalSort = null;
    } else {
      console.log(sortByDate);
      finalSort = sortByDate === "asc" ? 1 : -1;
    }
    let foundGrocery= await Grocery.find({ purchased: isPurchasedOrder }).sort({
      Date: finalSort,
    });
    res.json({ payload: foundGrocery });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

// async function sortGroceryByPurchased(req, res) {
//   try {
//     let isPurchased = req.query.isPurchased;
//     let isPurchasedOrder = isPurchased === "true" ? true : false;
//     let foundGrocery = await Grocery.find({ purchased: isPurchasedOrder });
//     res.json({ payload: foundGrocery });
//   } catch (e) {
//     res.status(500).json({ message: e.message, error: e });
//   }
// }

module.exports = {
  getAllGroceryItems,
  createGroceryItem,
  updateGrocery,
  updateGroceryPurchased,
  deleteGrocery,
  sortGroceryByDate,
  sortGroceryByPurchased
};