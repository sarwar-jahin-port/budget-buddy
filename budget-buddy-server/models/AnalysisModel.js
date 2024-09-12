const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const analysisSchema = new Schema({
    email: { type: String, required: true, unique: true },
    transactions: [{
        month: String, // 'MM' format
        income: Number,
        expense: Number
    }]
})

module.exports = mongoose.model('analysisCollection', analysisSchema);