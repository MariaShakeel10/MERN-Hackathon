import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className=" hidden lg:flex items-center justify-center w-1/2 bg-gray-50 px-12">
        <div className="max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome</h1>
        </div>
        
      </div>
      <div className="flex flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
