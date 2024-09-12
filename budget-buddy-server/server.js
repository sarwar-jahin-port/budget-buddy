const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route handlers
app.use('/api/users', require('./routes/userRoutes'));

// Global Error handling Middleware
app.use((er, req, res, next) =>{
    console.log(err.message);
    res.status(500).send({error: "Server Error"});
})

// Server Setup
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})