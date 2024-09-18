const express = require('express');
const {
    addTransaction,
    getTransactions,
    updateTransaction
} = require('../controllers/transactionController');

const router = express.Router();

// Add user Transaction
router.post("/add-transaction", addTransaction);

// Retrieve user Transactions
router.get("/ten-transactions/:email", getTransactions);

// Update a user Transaction
router.patch("/update-transaction/:id", updateTransaction);

module.exports = router;