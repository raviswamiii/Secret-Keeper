import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL; // from .env

  const handleLogout = async () => {
    try {
        const response = await axios.post(
      backendURL + "/user/logout",
      {},
      { withCredentials: true } // so backend can clear cookie
    );
    
    if (response.data.success) {
        localStorage.removeItem("accessToken");
        navigate("/signIn");
    } else {
        toast.error(response.data.message)
    }
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};
