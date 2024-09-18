const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: Date.now(),
    time: String,
    category: String,
    amount: String,
    tag: String,
    user_email: String
})

module.exports = mongoose.model('transactionCollection', transactionSchema);