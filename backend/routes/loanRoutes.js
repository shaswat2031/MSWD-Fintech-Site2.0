const express = require('express');
const router = express.Router();
const {
  createLoan,
  getLoanStatus,
  getAllLoans,
  getLoanByUser,
  getOngoingLoans,
  makePayment,
} = require('../controllers/loanController');
const { validateLoanRequest } = require('../middleware/validationMiddleware'); // Correct import

// Define routes
router.post('/create', validateLoanRequest('createLoan'), createLoan);
router.get('/status/:loanId', getLoanStatus);
router.get('/all', getAllLoans);
router.get('/user/:user', getLoanByUser);
router.get('/ongoing', getOngoingLoans);
router.post('/pay', validateLoanRequest('makePayment'), makePayment);

module.exports = router;