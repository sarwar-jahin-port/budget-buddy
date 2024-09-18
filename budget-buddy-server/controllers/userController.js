const User = require('../models/UserModel');

const addUser = async (req, res) =>{
    const {email} = req.body;
    const user = {email, dataStatus: false, incomeCategories: [], expenseCategories: [], budgetCategories: []};

    const isExist = await User.findOne({email});
    if(isExist){
        return res.status(400).json({message: "User already Exists"});
    }

    const newUser = new User(user);
    await newUser.save();
    res.status(201).json(newUser);
}

// TODO : Integrate the mongoose schema for the API's (User Schema)

const deleteUser = async (req, res) => {
    const {id} = req.params;

    const result = await transactionsCollection.deleteOne({_id: new ObjectId(id)});
    if(result?.deletedCount==1) res.send({deleted: true});
    else res.send({deleted: false});
}

const updateUser = async (req, res) => {
    const email = req.params.email;
    const updates = req.body;
    delete updates._id;

    const result = await usersCollection.updateOne(
        { email },
        { $set: updates }
    );

    if (result.modifiedCount > 0) {
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).send('User not found or no changes made');
    }
}

const getUser = async (req, res) => {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email });
    res.send(user);
}

const getStatus = async (req, res) => {
    const email = req.params.email;

    const user = await usersCollection.findOne({"email": email});

    if (user?.dataStatus) {
        res.send({"dataStatus": true})
    }
    else res.send({"dataStatus": false})
}

const budgetUpdate = async (req, res) => {
    const {data:budgetData, user} = req.body;
    console.log(req.body);
    const {incomeCategories, expenseCategories, budgets} = budgetData;

    // update data collection status on userDB
    const result = await usersCollection.updateOne(
        {email: user.email},
        {$set: {
            "dataStatus": true,
            "incomeCategories": Object.keys(incomeCategories).filter(category => incomeCategories[category]),
            "expenseCategories": Object.keys(expenseCategories).filter(category => expenseCategories[category]),
            "budgetCategories": budgets,
            },
        }
    )
    res.send(result);
}

module.exports = {
    addUser,
    deleteUser,
    updateUser,
    getUser,
    getStatus,
    budgetUpdate
}