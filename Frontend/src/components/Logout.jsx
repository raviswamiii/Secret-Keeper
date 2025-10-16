import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const onLogoutHandler = async () => {
    try {
      const response = await axios.post(
        backendURL + "/user/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      if (response.data.success) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  return (
    <div>
      <button
        onClick={onLogoutHandler}
        className="bg-red-500 p-2 w-[20vw] text-center"
      >
        Logout
      </button>
    </div>
  );
};
