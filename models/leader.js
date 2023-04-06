const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// {
//     "name": "Peter Pan",
//     "image": "images/alberto.png",
//     "designation": "Chief Epicurious Officer",
//     "abbr": "CEO",
//     "description": "Our CEO, Peter, . . .",
//     "featured": false
// }
var leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        unique: true,
        required: true
    },
    featured: {
        required: true,
        type: Boolean,
        default: ''
    }
})

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders