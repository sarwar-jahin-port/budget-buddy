const express = require('express');
const { incomeVexpense } = require("../controllers/analysisController");

const router = express.Router();

router.post('/Transaction-Analysis/incomeVexpense', incomeVexpense);