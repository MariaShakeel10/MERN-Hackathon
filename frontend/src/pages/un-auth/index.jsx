import React from "react";

function UnauthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r  from-teal-300 via-cyan-500 to-sky-700 text-white">
      <div className="text-center animate-bounce">
      <h1 className="text-6xl font-bold mb-4 animate-float">🚫 Unauthorized Access</h1>
        <p className="text-2xl mb-8">
          You do not have permission to view this page.
        </p>
      </div>
      <div className="animate-pulse">
        <a
          href="/" // Redirect to admin dashboard
          className="px-8 py-4 bg-white text-sky-900 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
}

export default UnauthPage;