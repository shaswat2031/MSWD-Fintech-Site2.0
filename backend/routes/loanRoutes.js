const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  createLoan,
  getLoanStatus,
  getAllLoans,
  getLoanByUser,
  getOngoingLoans, // Make sure to import this function
  makePayment,
} = require('../controllers/loanController');

// Define your routes
router.post('/create', createLoan);
router.get('/status/:loanId', getLoanStatus);
router.get('/all', getAllLoans);
router.get('/user/:user', getLoanByUser);
router.get('/ongoing', getOngoingLoans); // Fetch all ongoing loans
router.post('/pay', makePayment);

module.exports = router;
