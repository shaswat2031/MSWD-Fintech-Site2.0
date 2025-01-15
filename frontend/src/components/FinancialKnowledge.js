import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FinancialKnowledge = () => {
  const [activeTab, setActiveTab] = useState('Articles');
  const [articles, setArticles] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [toolData, setToolData] = useState({});

  // Fetch Articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // Tool Calculations
  const calculateLoan = () => {
    const { loanAmount, interestRate, years } = toolData;
    const rate = interestRate / 100 / 12;
    const n = years * 12;
    const monthlyPayment = (loanAmount * rate) / (1 - Math.pow(1 + rate, -n));
    return `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
  };

  const calculateInvestment = () => {
    const { principal, rate, time } = toolData;
    const total = principal * Math.pow(1 + rate / 100, time);
    return `Investment Value: $${total.toFixed(2)}`;
  };

  const calculateInflation = () => {
    const { currentPrice, inflationRate, years } = toolData;
    const futurePrice = currentPrice * Math.pow(1 + inflationRate / 100, years);
    return `Future Price: $${futurePrice.toFixed(2)}`;
  };

  const calculateSalary = () => {
    const { hourlyRate, hoursPerWeek } = toolData;
    const annualSalary = hourlyRate * hoursPerWeek * 52;
    return `Annual Salary: $${annualSalary.toFixed(2)}`;
  };

  const calculateInterest = () => {
    const { principal, rate, time } = toolData;
    const interest = (principal * rate * time) / 100;
    return `Interest: $${interest.toFixed(2)}`;
  };

  const calculateSalesTax = () => {
    const { price, taxRate } = toolData;
    const total = price * (1 + taxRate / 100);
    return `Total Price (with Tax): $${total.toFixed(2)}`;
  };

  const tools = [
    { name: 'Loan Calculator', calculate: calculateLoan, fields: ['loanAmount', 'interestRate', 'years'] },
    { name: 'Investment Calculator', calculate: calculateInvestment, fields: ['principal', 'rate', 'time'] },
    { name: 'Inflation Calculator', calculate: calculateInflation, fields: ['currentPrice', 'inflationRate', 'years'] },
    { name: 'Salary Calculator', calculate: calculateSalary, fields: ['hourlyRate', 'hoursPerWeek'] },
    { name: 'Interest Rate Calculator', calculate: calculateInterest, fields: ['principal', 'rate', 'time'] },
    { name: 'Sales Tax Calculator', calculate: calculateSalesTax, fields: ['price', 'taxRate'] },
  ];

  return (
    <div className="min-h-screen bg-hackerDark text-white p-8">
      <h1 className="text-5xl font-extrabold text-hackerGreen mb-8 text-center">
        Financial Knowledge Hub
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-3 rounded-t-lg font-bold ${
            activeTab === 'Articles' ? 'bg-hackerGreen text-hackerDark' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setActiveTab('Articles')}
        >
          Articles
        </button>
        <button
          className={`px-6 py-3 rounded-t-lg font-bold ${
            activeTab === 'Tools' ? 'bg-hackerGreen text-hackerDark' : 'bg-gray-700 text-gray-300'
          }`}
          onClick={() => setActiveTab('Tools')}
        >
          Tools
        </button>
      </div>

      {/* Articles Tab */}
      {activeTab === 'Articles' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article._id} className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-hackerGreen mb-2">{article.title}</h3>
              <p className="text-gray-300">{article.summary}</p>
              <Link to={`/article/${article._id}`} target="_blank" rel="noopener noreferrer">
                <button className="mt-4 bg-hackerGreen text-hackerDark px-4 py-2 rounded font-bold">
                  Read More
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === 'Tools' && (
        <div>
          {activeTool ? (
            <div className="bg-hackerDark border-2 border-hackerGreen p-6 rounded-lg">
              <h2 className="text-3xl font-bold text-hackerGreen mb-6">{activeTool.name}</h2>
              {activeTool.fields.map((field) => (
                <div key={field} className="mb-4">
                  <input
                    type="number"
                    placeholder={field}
                    onChange={(e) => setToolData({ ...toolData, [field]: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 rounded bg-gray-600 text-white focus:outline-none"
                  />
                </div>
              ))}
              <button
                onClick={() => alert(activeTool.calculate())}
                className="mt-4 bg-hackerGreen text-hackerDark px-4 py-2 rounded font-bold"
              >
                Calculate
              </button>
              <button
                onClick={() => setActiveTool(null)}
                className="ml-4 mt-4 bg-red-500 text-white px-4 py-2 rounded font-bold"
              >
                Back to Tools
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <div key={index} className="bg-hackerDark border-2 border-hackerGreen p-6 rounded-lg text-center">
                  <h2 className="text-2xl font-semibold text-hackerGreen mb-4">{tool.name}</h2>
                  <button
                    onClick={() => setActiveTool(tool)}
                    className="mt-4 bg-hackerGreen text-hackerDark px-4 py-2 rounded font-bold"
                  >
                    Use {tool.name}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialKnowledge;
