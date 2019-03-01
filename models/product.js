var mongoose = require('mongoose');

// SCHEMA
var productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    cateory: String
});

module.exports = mongoose.model("Product", productSchema);