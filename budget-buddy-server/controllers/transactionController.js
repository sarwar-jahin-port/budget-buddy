const Transaction = require('../models/TransactionModel');

// TODO : Integrate the mongoose schema within the API's (Transaction Schema)

const addTransaction = async (req, res) => {
    const transaction = req.body;
    console.log(transaction);
    const result = await transactionsCollection.insertOne(transaction);
    console.log(result);
    res.send(result);
}

const getTransactions = async (req, res) => {
    const {email} = req.params;
    console.log(email);
    const result = await transactionsCollection.find({"user-email": email}).toArray();
    console.log(result);
    res.send(result);
}

const updateTransaction = async (req, res) => {
    const {id} = req.params;
    const updatedTransaction = req.body;

    const result = await transactionsCollection.updateOne(
        {_id: new ObjectId(id)},
        {$set: updatedTransaction},
    );

    if (result?.modifiedCount>0) res.send({updated: true});
    else res.send({update: false});
}

module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction
}