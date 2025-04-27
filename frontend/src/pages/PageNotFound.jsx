import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-300 via-cyan-500 to-sky-700">
      <div className="text-center animate-bounce">
      <h1 className="text-6xl font-bold mb-4 animate-float">404</h1>
        <p className="text-2xl text-white mt-4">Oops! Page not found.</p>
        <p className="text-lg text-white mt-2">
          The page you're looking for doesn't exist or another error occurred.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-white text-sky-900 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;