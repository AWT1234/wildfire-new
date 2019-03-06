var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// SCHEMA
var orderSchema = new mongoose.Schema({
    orderDate: Date,
    tableNum: String,
    userID: String,
    total: SchemaTypes.Double,
    orderDetail: [
        {
            productName: String,
            quantity: String
        }
    ],
    paymentMethod: String,
    status: String
});

module.exports = mongoose.model("Order", orderSchema);