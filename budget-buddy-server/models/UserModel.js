const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    dataStatus: {type: Boolean, required: false},
    incomeCategories: [String],
    expenseCategories: [String],
    budgetCategories: [String],
});

module.exports = mongoose.model('User', userSchema);