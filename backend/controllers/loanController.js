// controllers/loanController.js
const Loan = require('../models/Loan');

// Mock Loan Approval (Simulate Loan Calculation and Initial Data)
exports.createLoan = async (req, res) => {
  const { user, loanAmount, interestRate, installmentPeriod } = req.body;

  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyInstallment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -installmentPeriod));
  
  const newLoan = new Loan({
    user,
    loanAmount,
    interestRate,
    installmentPeriod,
    monthlyInstallment,
    remainingBalance: loanAmount,
    payments: []
  });

  try {
    const savedLoan = await newLoan.save();
    res.status(201).json(savedLoan);
  } catch (error) {
    res.status(500).json({ message: "Error creating loan", error });
  }
};

// Make a Payment (Simulate payment and reduce loan balance)
exports.makePayment = async (req, res) => {
  const { loanId, paymentAmount } = req.body;

  try {
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    if (paymentAmount > loan.remainingBalance) {
      return res.status(400).json({ message: "Payment exceeds remaining balance" });
    }

    // Update remaining balance
    loan.remainingBalance -= paymentAmount;

    // Record the payment
    loan.payments.push({
      amount: paymentAmount,
      date: new Date()
    });

    const updatedLoan = await loan.save();
    res.status(200).json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: "Error processing payment", error });
  }
};

// Get Loan Status
exports.getLoanStatus = async (req, res) => {
  const { loanId } = req.params;

  try {
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: "Error fetching loan status", error });
  }
};
