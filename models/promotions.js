const mongoose = require('mongoose');

var promoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        rquired: true
    },
    label : {
        type: String,
        default: ''
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    }
});

var Promotions = mongoose.model('Promotion', promoSchema);

module.exports = Promotions;