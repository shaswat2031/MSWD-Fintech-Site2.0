const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now }
});

const loanSchema = mongoose.Schema(
  {
    user: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    installmentPeriod: { type: Number, required: true }, // in months
    monthlyInstallment: { type: Number, required: true },
    remainingBalance: { type: Number, required: true },
    payments: [paymentSchema], // Array of payment objects
    status: { type: String, default: 'Ongoing', enum: ['Ongoing', 'Completed'] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Loan', loanSchema);
