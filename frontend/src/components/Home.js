import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [selectedMember, setSelectedMember] = useState(null);

  // Team Members Data
const teamMembers = [
    {
        name: 'Sugam Bhardwaj',
        role: 'UI/UX Designer',
        details: 'Sugam is a UI/UX designer with a passion for creating beautiful and user-friendly interfaces.',
    },
    {
        name: 'Mann Patel',
        role: 'Frontend Developer',
        details: 'Mann is a frontend developer who loves building web applications with React. He also loves to play with data.',
    },
    {
        name: 'Prasad Shaswat',
        role: 'Full Stack Developer',
        details: 'Prasad is a full stack developer who enjoys working with both frontend and backend technologies. He is a MERN stack developer.',
    },
    {
        name: 'Siddharth Singh',
        role: 'Backend Developer',
        details: 'Siddharth is a backend developer who specializes in building scalable and secure APIs. He is also a data enthusiast.',
    },
    {
        name: 'Siddharth Singh',
        role: 'Backend Developer',
        details: 'Siddharth is a backend developer who specializes in building scalable and secure APIs. He is also a data enthusiast.',
    },


];

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <div className="text-2xl font-bold">FinHack</div>
        <div className="flex space-x-6">
          <button
            onClick={() => navigate('/expense-management')}
            className="hover:text-green-300"
          >
            Expense Management
          </button>
          <button
            onClick={() => navigate('/loan-management')}
            className="hover:text-green-300"
          >
            Loan Management
          </button>
          <button
            onClick={() => navigate('/financial-knowledge')}
            className="hover:text-green-300"
          >
            Financial Knowledge
          </button>
          <button onClick={handleLogout} className="hover:text-green-300">
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20">
        <h1 className="text-4xl font-extrabold">
          Welcome to <span className="text-green-500">FinHack</span>
        </h1>
        <p className="mt-4 text-lg">
          Your one-stop solution for managing expenses, loans, and financial literacy.
        </p>
        <button
          onClick={() => navigate('/expense-management')}
          className="mt-6 px-6 py-3 bg-green-500 text-gray-900 font-bold rounded hover:bg-green-400"
        >
          Get Started
        </button>
      </header>

      {/* Our Team Section */}
      <section className="py-20 bg-gray-800 text-white">
        <h2 className="text-center text-3xl font-bold">Our Team</h2>
        <div className="flex flex-col lg:flex-row items-start justify-center mt-10 gap-10">
          {/* Team Member Cards */}
          <div className="flex flex-col space-y-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`w-64 bg-gray-700 p-6 rounded-lg cursor-pointer transition-transform hover:scale-105 ${
                  selectedMember === member.name ? 'border-4 border-green-400' : ''
                }`}
                onClick={() => setSelectedMember(member.name)}
              >
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="mt-2">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Selected Member Details */}
          <div className="w-full lg:w-1/2 bg-gray-700 p-6 rounded-lg">
            {selectedMember ? (
              <>
                <h3 className="text-2xl font-bold">
                  {teamMembers.find((member) => member.name === selectedMember)?.name}
                </h3>
                <p className="mt-2 text-green-400">
                  {teamMembers.find((member) => member.name === selectedMember)?.role}
                </p>
                <p className="mt-4">
                  {teamMembers.find((member) => member.name === selectedMember)?.details}
                </p>
              </>
            ) : (
              <p className="text-center text-gray-400">
                Click on a team member to view details.
              </p>
            )}
          </div>
        </div>
      </section>

    

        {/* Footer */}
        <footer className="bg-gray-900 text-white font-bold text-2xl text-center py-4">
            <p>&copy; 2025 FinHack. All rights reserved.</p>
        </footer>


    </div>
  );
};

export default Home;
