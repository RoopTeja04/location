const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Item = require("../models/items");

router.post("/create", async (req, res) => {

    const { name, type, items } = req.body;

    try {
        const createdItems = await Item.insertMany(items);

        const itemsIDs = createdItems.map((item) => item._id);

        const newProduct = new Product({
            name,
            type,
            items: itemsIDs
        });

        await newProduct.save();

        return res.status(201).json({
            message: "Product and items created successfully",
            product: newProduct,
        });
    }
    catch (err) {
        return res.status(500).status({ message: err.message })
    }

})

router.post("/", async (req, res) => {

    try {
        const products = await Product.find().populate("items");
        return res.status(200).json({
            message: "Products fetched successfully",
            products,
        });
    }
    catch (err) {
        return res.status(500).status({ message: err.message })
    }

})

module.exports = router; 