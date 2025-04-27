import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white h-full flex flex-col justify-center items-center text-center px-4 py-16">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Our Amazing Store!
        </h1>
        <p className="text-xl mb-6">
          Discover a wide variety of products at unbeatable prices. Shop now for the best deals!
        </p>

        {/* Button Group */}
        <div className="space-x-4">
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-yellow-500 text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth/register")}
            className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-400 transition duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/tasks")}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-400 transition duration-300"
          >
            Add Task
          </button>
        </div>
      </section>

      {/* Footer Section (Optional) */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-auto w-full">
        <p className="text-sm">&copy; 2025 Our Amazing Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

