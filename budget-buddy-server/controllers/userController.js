const User = require('../models/UserModel');

exports.addUser = async (req, res) =>{
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