const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    detailedAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    defaultAddress: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;