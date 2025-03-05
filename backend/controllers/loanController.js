const Loan = require('../models/Loan');

// Create a new loan
exports.createLoan = async (req, res) => {
  const { user, loanAmount, interestRate, installmentPeriod } = req.body;

  try {
    const monthlyInterestRate = interestRate / 100 / 12;
    const monthlyInstallment =
      loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -installmentPeriod));

    const newLoan = new Loan({
      user,
      loanAmount,
      interestRate,
      installmentPeriod,
      monthlyInstallment,
      remainingBalance: loanAmount,
      payments: [],
    });

    const savedLoan = await newLoan.save();

    res.status(201).json({
      message: 'Loan created successfully!',
      loanId: savedLoan._id, // Loan ID
      user: savedLoan.user,
      loanAmount: savedLoan.loanAmount,
      interestRate: savedLoan.interestRate,
      monthlyInstallment: savedLoan.monthlyInstallment.toFixed(2),
      remainingBalance: savedLoan.remainingBalance.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan', error });
  }
};

// Get loan details by ID
exports.getLoanStatus = async (req, res) => {
  const { loanId } = req.params;

  try {
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json({
      message: 'Loan details fetched successfully!',
      loanId: loan._id, // Loan ID
      user: loan.user,
      loanAmount: loan.loanAmount.toFixed(2),
      interestRate: loan.interestRate.toFixed(2),
      monthlyInstallment: loan.monthlyInstallment.toFixed(2),
      remainingBalance: loan.remainingBalance.toFixed(2),
      payments: loan.payments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan details', error });
  }
};

// Get all loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();

    res.status(200).json({
      message: 'All loans fetched successfully!',
      loans,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all loans', error });
  }
};

// Get loans by user
exports.getLoanByUser = async (req, res) => {
  const { user } = req.params;

  try {
    const loans = await Loan.find({ user });

    if (!loans || loans.length === 0) {
      return res.status(404).json({ message: 'No loans found for the user' });
    }

    res.status(200).json({
      message: 'Loans for the user fetched successfully!',
      loans,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans for user', error });
  }
};

// Get all ongoing loans
exports.getOngoingLoans = async (req, res) => {
  try {
    // Fetch loans with a positive remaining balance
    const loans = await Loan.find({ remainingBalance: { $gt: 0 } });

    res.status(200).json({
      message: 'Ongoing loans fetched successfully!',
      loans,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ongoing loans', error });
  }
};


// Simulate payment (not included in your code above but assumed)
exports.makePayment = async (req, res) => {
  const { loanId, paymentAmount } = req.body;

  try {
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (paymentAmount > loan.remainingBalance) {
      return res.status(400).json({ message: 'Payment exceeds remaining balance' });
    }

    loan.remainingBalance -= paymentAmount;

    loan.payments.push({
      amount: paymentAmount,
      date: new Date(),
    });

    const updatedLoan = await loan.save();

    res.status(200).json({
      message: 'Payment made successfully!',
      updatedLoan,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error making payment', error });
  }
};
