const mongoose = require("mongoose");

const Products = new mongoose.Schema({

    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["veg", "non-veg"] },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]

});

module.exports = mongoose.model("Product", Products);