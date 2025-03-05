import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Sugam Bhardwaj",
      role: "UI/UX Designer",
      details: "Sugam is a creative UI/UX designer with a deep understanding of modern design trends. He specializes in crafting visually stunning and user-friendly interfaces to enhance the overall experience.",
      image: "https://source.unsplash.com/200x200/?designer,person"
    },
    {
      name: "Mann Patel",
      role: "Frontend Developer",
      details: "Mann is an expert in React and JavaScript, creating dynamic and interactive user interfaces. His attention to detail ensures that web applications are both functional and aesthetically pleasing.",
      image: "https://source.unsplash.com/200x200/?developer,coding"
    },
    {
      name: "Prasad Shaswat",
      role: "Full Stack Developer",
      details: "Prasad is skilled in both frontend and backend development, building scalable web applications with the MERN stack. He ensures smooth integration between client and server.",
      image: "https://source.unsplash.com/200x200/?technology,person"
    },
    {
      name: "Soham Parasakar",
      role: "Backend Developer",
      details: "Soham specializes in designing secure and efficient backend architectures. He is proficient in handling databases, APIs, and optimizing performance for seamless user experiences.",
      image: "https://source.unsplash.com/200x200/?backend,server"
    },
    {
      name: "Tejas Borase",
      role: "Backend Developer",
      details: "Tejas is passionate about backend development, ensuring high-performance data management and API security. His work focuses on optimizing server-side operations.",
      image: "https://source.unsplash.com/200x200/?programmer,developer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-gray-950 bg-opacity-90 shadow-lg">
        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          FinHack
        </span>
        <div className="flex space-x-6">
          {["Expense Management", "Loan Management", "Financial Knowledge"].map((item, index) => (
            <motion.button
              key={index}
              onClick={() => navigate(`/${item.toLowerCase().replace(/\s+/g, "-")}`)}
              whileHover={{ scale: 1.1 }}
              className="hover:text-blue-400 transition-all duration-300"
            >
              {item}
            </motion.button>
          ))}
        </div>
        <button className="px-5 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg font-semibold shadow-md transition-all">
          Logout
        </button>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col lg:flex-row items-center justify-between px-8 py-24">
        <motion.div className="text-left lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-extrabold mb-4 text-blue-400">Welcome to <span className="text-white">FinHack</span></h1>
          <p className="mt-4 text-lg text-gray-300">Your smart financial assistant for managing expenses, loans, and financial literacy.</p>
          <motion.button onClick={() => navigate("/expense-management")}
            className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}>
            Get Started
          </motion.button>
        </motion.div>
        <motion.div className="w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}>
          <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uZXl8ZW58MHx8MHx8fDA%3D"
            alt="Financial Management"
            className="w-4/5 rounded-lg shadow-lg" />
        </motion.div>
      </header>

      {/* Team Section */}
      <section className="py-24">
        <h2 className="text-center text-4xl font-bold text-white mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {teamMembers.map((member, index) => (
            <motion.div key={index} className="bg-gray-800 p-8 rounded-lg shadow-xl hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setSelectedMember(member.name)} whileHover={{ scale: 1.05 }}>
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className="mt-2 text-gray-400">{member.role}</p>
              {selectedMember === member.name && (
                <motion.div className="mt-4 text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>{member.details}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-8 text-center">
        <p className="font-semibold">&copy; 2025 FinHack. All rights reserved.</p>
        <p className="text-sm mt-4">Created with ❤️ by FinHack Team</p>
      </footer>
    </div>
  );
};

export default Home;