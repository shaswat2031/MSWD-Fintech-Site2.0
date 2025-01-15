// routes/loanRoutes.js
const express = require('express');
const { createLoan, makePayment, getLoanStatus } = require('../controllers/loanController');

const router = express.Router();

// Routes
router.post('/create', createLoan);         // Create loan
router.post('/pay', makePayment);           // Make a payment
router.get('/status/:loanId', getLoanStatus); // Get loan status

module.exports = router;
