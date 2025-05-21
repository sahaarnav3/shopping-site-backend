const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    address: {
        name: { type: String, required: true},
        mobileNumber: { type: Number, required: true},
        pincode: { type: Number, required: true},
        detailedAddress: { type: String, required: true},
        city: { type: String, required: true},
        state: { type: String, required: true},
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);