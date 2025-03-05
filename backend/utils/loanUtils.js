//code of utils
// Calculate monthly installment using the formula for EMI
exports.calculateMonthlyInstallment = (principal, annualInterestRate, months) => {
    const monthlyRate = annualInterestRate / 100 / 12;
    return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
  };
  