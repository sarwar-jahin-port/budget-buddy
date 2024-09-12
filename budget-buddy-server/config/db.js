const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb+srv://shahriarrijon:3dQjzPvas7BcynB6@cluster0.d3cyl9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async ()=>{
    // Connecting using mongoose to utilize models and schemas
    mongoose.connect(uri, {dbName: 'budgetBuddyDB'})
    .then(() => console.log('MongoDB connected successfully(mongoose)'))
    .catch(err => console.error('MongoDB connection error(mongoose:', err));
}

module.exports = connectDB;