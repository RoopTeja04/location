const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    size: {
        type: String,
        required: true,
        enum: ["250g", "500g", "750g", "1000g"]
    },
    stock: {
        type: String,
        required: true,
        enum: ["available", "unavailable", "limited-stock"]
    }
});

module.exports = mongoose.model("Item", ItemSchema);