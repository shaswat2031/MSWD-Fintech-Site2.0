// models/Loan.js
const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  loanAmount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  installmentPeriod: {
    type: Number, // in months
    required: true
  },
  monthlyInstallment: {
    type: Number,
    required: true
  },
  remainingBalance: {
    type: Number,
    required: true
  },
  payments: [{
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
