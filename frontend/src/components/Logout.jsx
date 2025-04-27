import React from "react";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
import { logOutUser } from "../store/auth-slice"; 

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logOutUser()); 
    navigate("/auth/login"); 
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
