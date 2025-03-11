const { body } = require('express-validator');

const validateLoanRequest = (method) => {
  switch (method) {
    case 'createLoan':
      return [
        body('user').notEmpty().withMessage('User name is required'),
        body('loanAmount').isNumeric().withMessage('Loan amount must be a number'),
        body('interestRate').isNumeric().withMessage('Interest rate must be a number'),
        body('installmentPeriod').isNumeric().withMessage('Installment period must be a number'),
      ];
    case 'makePayment':
      return [
        body('loanId').notEmpty().withMessage('Loan ID is required'),
        body('paymentAmount').isNumeric().withMessage('Payment amount must be a number'),
      ];
    default:
      return [];
  }
};

// Export the function
module.exports = { validateLoanRequest };