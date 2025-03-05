// components/LoanManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanManagement = () => {
  const [loanData, setLoanData] = useState({
    user: '',
    loanAmount: 0,
    interestRate: 0,
    installmentPeriod: 0
  });

  const [paymentData, setPaymentData] = useState({
    loanId: '',
    paymentAmount: 0
  });

  const [loanStatus, setLoanStatus] = useState(null);
  const [ongoingLoans, setOngoingLoans] = useState([]);
  const [completedLoans, setCompletedLoans] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState('create'); // Tab state

  // Fetch ongoing and completed loans on component mount
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Fetch ongoing loans
        const ongoingResponse = await axios.get('http://localhost:5000/api/loans/ongoing');
        setOngoingLoans(ongoingResponse.data.loans);

        // Fetch completed loans (remainingBalance === 0)
        const allLoansResponse = await axios.get('http://localhost:5000/api/loans/all');
        const completed = allLoansResponse.data.loans.filter(
          (loan) => loan.remainingBalance === 0
        );
        setCompletedLoans(completed);
      } catch (error) {
        setMessage('Error fetching loans from the server');
      }
    };

    fetchLoans();
  }, []);

  // Create Loan
  const createLoan = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/loans/create', loanData);
      setOngoingLoans([...ongoingLoans, response.data]);  // Add to ongoing loans
      setLoanStatus(response.data);
      setMessage('Loan created successfully!');
    } catch (error) {
      setMessage('Error creating loan');
    }
  };

  // Make a Payment
  const makePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/loans/pay', paymentData);
      const updatedLoan = response.data;
      setLoanStatus(updatedLoan);

      // Move loan to completed if paid off
      if (updatedLoan.remainingBalance === 0) {
        setOngoingLoans(ongoingLoans.filter(loan => loan.loanId !== updatedLoan.loanId));
        setCompletedLoans([...completedLoans, updatedLoan]);
      }
      setMessage('Payment successful!');
    } catch (error) {
      setMessage('Error making payment');
    }
  };

  // Get Loan Status
  const getLoanStatus = async (loanId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/loans/status/${loanId}`);
      setLoanStatus(response.data);
    } catch (error) {
      setMessage('Error fetching loan status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">Loan Management System</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setSelectedTab('create')}
          className={`px-6 py-2 rounded-l-lg ${selectedTab === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-blue-400'} hover:bg-blue-700 hover:text-white transition duration-200 border border-blue-600`}
        >
          Create Loan
        </button>
        <button
          onClick={() => setSelectedTab('pay')}
          className={`px-6 py-2 ${selectedTab === 'pay' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-blue-400'} hover:bg-blue-700 hover:text-white transition duration-200 border border-blue-600`}
        >
          Make Payment
        </button>
        <button
          onClick={() => setSelectedTab('status')}
          className={`px-6 py-2 ${selectedTab === 'status' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-blue-400'} hover:bg-blue-700 hover:text-white transition duration-200 border border-blue-600`}
        >
          Loan Status
        </button>
        <button
          onClick={() => setSelectedTab('loans')}
          className={`px-6 py-2 rounded-r-lg ${selectedTab === 'loans' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-blue-400'} hover:bg-blue-700 hover:text-white transition duration-200 border border-blue-600`}
        >
          Loans Overview
        </button>
      </div>

      {/* Create Loan Section */}
      {selectedTab === 'create' && (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto mb-8 border border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">Create Loan</h3>
          <div className="space-y-5">
            <label className="text-gray-300">User Name</label>
            <input
              type="text"
              value={loanData.user}
              onChange={(e) => setLoanData({ ...loanData, user: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
            />

            <label className="text-gray-300">Loan Amount</label>
            <input
              type="number"
              value={loanData.loanAmount}
              onChange={(e) => setLoanData({ ...loanData, loanAmount: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
            />

            <label className="text-gray-300">Interest Rate</label>
            <input
              type="number"
              value={loanData.interestRate}
              onChange={(e) => setLoanData({ ...loanData, interestRate: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
            />

            <label className="text-gray-300">Installment Period (months)</label>
            <input
              type="number"
              value={loanData.installmentPeriod}
              onChange={(e) => setLoanData({ ...loanData, installmentPeriod: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={createLoan}
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Create Loan
            </button>
          </div>
        </div>
      )}

      {/* Make Payment Section */}
      {selectedTab === 'pay' && (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto mb-8 border border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">Make Payment</h3>
          <div className="space-y-5">
            <label className="text-gray-300">Loan ID</label>
            <input
              type="text"
              value={paymentData.loanId}
              onChange={(e) => setPaymentData({ ...paymentData, loanId: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
            />

            <label className="text-gray-300">Payment Amount</label>
            <input
              type="number"
              value={paymentData.paymentAmount}
              onChange={(e) => setPaymentData({ ...paymentData, paymentAmount: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={makePayment}
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Make Payment
            </button>
          </div>
        </div>
      )}

      {/* Loan Status Section */}
      {selectedTab === 'status' && (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto mb-8 border border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">Loan Status</h3>
          <div className="space-y-5">
            <label className="text-gray-300">Enter Loan ID</label>
            <input
              type="text"
              value={paymentData.loanId}
              onChange={(e) => {
                setPaymentData({ ...paymentData, loanId: e.target.value });
                getLoanStatus(e.target.value);
              }}
              className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
            />
            {loanStatus && (
              <div className="bg-gray-700 p-4 rounded-lg text-gray-100 mt-4">
                <p><strong>Loan ID:</strong> {loanStatus.loanId}</p>
                <p><strong>User:</strong> {loanStatus.user}</p>
                <p><strong>Loan Amount:</strong> ${loanStatus.loanAmount}</p>
                <p><strong>Remaining Balance:</strong> ${loanStatus.remainingBalance}</p>
                <p><strong>Monthly Installment:</strong> ${loanStatus.monthlyInstallment}</p>
                <p><strong>Status:</strong> {loanStatus.remainingBalance === 0 ? 'Completed' : 'Ongoing'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loans Overview Tab */}
      {selectedTab === 'loans' && (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto mb-8 border border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">Loans Overview</h3>

          <div className="mb-6">
            <h4 className="text-xl text-blue-400 mb-4">Ongoing Loans</h4>
            <ul className="list-disc pl-5">
              {ongoingLoans.map((loan) => (
                <li key={loan.loanId} className="text-gray-300">
                  <strong>Loan ID:</strong> {loan.loanId} - {loan.user} - ${loan.loanAmount}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl text-blue-400 mb-4">Completed Loans</h4>
            <ul className="list-disc pl-5">
              {completedLoans.map((loan) => (
                <li key={loan.loanId} className="text-gray-300">
                  <strong>Loan ID:</strong> {loan.loanId} - {loan.user} - ${loan.loanAmount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div className="bg-blue-600 text-white p-4 rounded-lg text-center w-full max-w-lg mx-auto">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default LoanManagement;