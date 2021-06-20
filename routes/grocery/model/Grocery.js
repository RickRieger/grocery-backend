const mongoose = require("mongoose");
const grocerySchema = new mongoose.Schema({
  grocery: {
    type: String,
  },
  purchased: {
    type: Boolean,
    default: false,
  },
  Date: {
    type: Date,
    default: () => Date.now(),
  },
});
// * grocery: String
// * purchased: Boolean
// * Date: Date.now
module.exports = mongoose.model("grocery", grocerySchema);