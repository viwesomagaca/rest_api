const mongoose = require('mongoose');

const item = mongoose.Schema({
    itemname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Item', item);