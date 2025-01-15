import React, { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Home = () => {
  const navigate = useNavigate();

  // GLTF Model Loader Components
  const MoneyModel = () => {
    const gltf = useGLTF("/money_stacks/scene.gltf");
    return <primitive object={gltf.scene} scale={8} />;
  };




  const [selectedMember, setSelectedMember] = useState(null);

  // Team Members Data
  const teamMembers = [
    {
      name: "Sugam Bhardwaj",
      role: "UI/UX Designer",
      details:
        "Sugam is a UI/UX designer with a passion for creating beautiful and user-friendly interfaces.",
    },
    {
      name: "Mann Patel",
      role: "Frontend Developer",
      details:
        "Mann is a frontend developer who loves building web applications with React. He also loves to play with data.",
    },
    {
      name: "Prasad Shaswat",
      role: "Full Stack Developer",
      details:
        "Prasad is a full stack developer who enjoys working with both frontend and backend technologies. He is a MERN stack developer.",
    },
    {
      name: "Siddharth Singh",
      role: "Backend Developer",
      details:
        "Siddharth is a backend developer who specializes in building scalable and secure APIs. He is also a data enthusiast.",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gray-900 text-green-400">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <div className="text-2xl font-bold">FinHack</div>
        <div className="flex space-x-6">
          <button
            onClick={() => navigate("/expense-management")}
            className="hover:text-green-300"
          >
            Expense Management
          </button>
          <button
            onClick={() => navigate("/loan-management")}
            className="hover:text-green-300"
          >
            Loan Management
          </button>
          <button
            onClick={() => navigate("/financial-knowledge")}
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
      <header className="flex items-center justify-between px-8 py-20 w-full">
        {/* Left Side: Text Content */}
        <div className="w-1/2 text-left">
          <h1 className="text-4xl font-extrabold mb-4">
            Welcome to <span className="text-green-500">FinHack</span>
          </h1>
          <p className="mt-4 text-lg">
            Your one-stop solution for managing expenses, loans, and financial
            literacy.
          </p>
          <button
            onClick={() => navigate("/expense-management")}
            className="mt-6 px-6 py-3 bg-green-500 text-gray-900 font-bold rounded hover:bg-green-400"
          >
            Get Started
          </button>
        </div>

        {/* Right Side: 3D Money Model */}
          <div className="w-1/2 flex justify-center">
            <Canvas camera={{ position: [2, 2, 2] }}>
              <ambientLight />
              <pointLight position={[20, 20, 10]} />
              <MoneyModel />
              <OrbitControls enableZoom={true} maxDistance={4} minDistance={1.5} />
            </Canvas>
          </div>
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
                  selectedMember === member.name
                    ? "border-4 border-green-400"
                    : ""
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
                  {
                    teamMembers.find((member) => member.name === selectedMember)
                      ?.name
                  }
                </h3>
                <p className="mt-2 text-green-400">
                  {
                    teamMembers.find((member) => member.name === selectedMember)
                      ?.role
                  }
                </p>
                <p className="mt-4">
                  {
                    teamMembers.find((member) => member.name === selectedMember)
                      ?.details
                  }
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
      {/* why i created these porect these proejct Basicallty MEARN preoject submit ot maskud sir and problemsstatemnt and soltukon  */}
      {/* /* Features Section */}
      <section className="py-10 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold">Why FinHack?</h2>
        <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-10">
          {/* Feature Cards */}
          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="w-64 bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Expense Management</h3>
              <p className="mt-2">
                Keep track of your expenses and manage your budget effectively.
              </p>
            </div>
            <div className="w-64 bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Loan Management</h3>
              <p className="mt-2">
                Manage your loans and keep track of your repayments.
              </p>
            </div>
            <div className="w-64 bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Financial Knowledge</h3>
              <p className="mt-2">
                Learn about personal finance and make informed decisions.
              </p>
            </div>
            <div className="w-64 bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold">USer Esaily ACcesed UI</h3>
              <p className="mt-2">
                Learn about personal finance and make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-700 text-white font-bold text-2xl text-center py-4">
        <p>&copy; 2025 FinHack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
