// components/LoanManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const LoanManagement = () => {
  const [loanData, setLoanData] = useState({
    user: "",
    loanAmount: 0,
    interestRate: 0,
    installmentPeriod: 0,
  });

  const [paymentData, setPaymentData] = useState({
    loanId: "",
    paymentAmount: 0,
  });

  const [loanStatus, setLoanStatus] = useState(null);
  const [ongoingLoans, setOngoingLoans] = useState([]);
  const [completedLoans, setCompletedLoans] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState("create");

  // Fetch ongoing and completed loans on component mount
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const ongoingResponse = await axios.get(
          "http://localhost:5000/api/loans/ongoing"
        );
        setOngoingLoans(ongoingResponse.data.loans);

        const allLoansResponse = await axios.get(
          "http://localhost:5000/api/loans/all"
        );
        const completed = allLoansResponse.data.loans.filter(
          (loan) => loan.remainingBalance === 0
        );
        setCompletedLoans(completed);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Error fetching loans from the server"
        );
      }
    };

    fetchLoans();
  }, []);

  // Create Loan
  const createLoan = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loans/create",
        loanData
      );

      setOngoingLoans((prev) => [...prev, response.data]);
      setLoanStatus(response.data);
      setMessage("Loan created successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating loan");
    }
  };

  // Make Payment
  const makePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loans/pay",
        paymentData
      );
      const updatedLoan = response.data.updatedLoan;

      setLoanStatus(updatedLoan);

      // Update UI: Move loan to completed if paid off
      if (updatedLoan.remainingBalance === 0) {
        setOngoingLoans((prev) =>
          prev.filter((loan) => loan._id !== updatedLoan._id)
        );
        setCompletedLoans((prev) => [...prev, updatedLoan]);
      }
      setMessage("Payment successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error making payment");
    }
  };

  // Get Loan Status
  const getLoanStatus = async (loanId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/loans/status/${loanId}`
      );
      setLoanStatus(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error fetching loan status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
        Loan Management System
      </h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        {["create", "pay", "status", "loans"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-6 py-2 ${selectedTab === tab ? "bg-blue-600 text-white" : "bg-gray-800 text-blue-400"} hover:bg-blue-700 hover:text-white transition duration-200 border border-blue-600`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Create Loan */}
      {selectedTab === "create" && (
        <div className="max-w-lg mx-auto bg-gray-800 shadow-lg p-6 rounded-lg border border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">Create Loan</h3>
          {["user", "loanAmount", "interestRate", "installmentPeriod"].map((field) => (
            <div key={field}>
              <label className="text-gray-300">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type={field === "user" ? "text" : "number"}
                value={loanData[field]}
                onChange={(e) => setLoanData({ ...loanData, [field]: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <button onClick={createLoan} className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
            Create Loan
          </button>
        </div>
      )}

      {/* Make Payment */}
      {selectedTab === "pay" && (
        <div className="max-w-lg mx-auto bg-gray-800 shadow-lg p-6 rounded-lg border border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">Make Payment</h3>
          {["loanId", "paymentAmount"].map((field) => (
            <div key={field}>
              <label className="text-gray-300">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                value={paymentData[field]}
                onChange={(e) => setPaymentData({ ...paymentData, [field]: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <button onClick={makePayment} className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
            Make Payment
          </button>
        </div>
      )}

      {/* Loan Status */}
      {selectedTab === "status" && (
        <div className="max-w-lg mx-auto bg-gray-800 shadow-lg p-6 rounded-lg border border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">Loan Status</h3>
          <input
            type="text"
            placeholder="Enter Loan ID"
            onChange={(e) => getLoanStatus(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100"
          />
          {loanStatus && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <p><strong>User:</strong> {loanStatus.user}</p>
              <p><strong>Loan Amount:</strong> ${loanStatus.loanAmount}</p>
              <p><strong>Remaining Balance:</strong> ${loanStatus.remainingBalance}</p>
            </div>
          )}
        </div>
      )}

      {/* Message Display */}
      {message && <div className="bg-blue-600 text-white p-4 rounded-lg text-center max-w-lg mx-auto">{message}</div>}
    </div>
  );
};

export default LoanManagement;
