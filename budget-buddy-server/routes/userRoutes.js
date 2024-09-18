const express = require('express');
const {
    addUser,
    deleteUser, 
    updateUser, 
    getUser,
    getStatus,
    budgetUpdate
} = require('../controllers/userController');

const router = express.Router();

// Add User
router.post('/add-user', addUser);

// Delete User
router.delete("/delete-transaction/:id", deleteUser);

// Update User and their transaction fields aswell
router.patch("/user/:email", updateUser);

// Retrieves one user data using the email
router.get('/user/:email', getUser);

router.get('/data-status/:email', getStatus);

router.patch('user-budget-data', budgetUpdate);

module.exports = router;