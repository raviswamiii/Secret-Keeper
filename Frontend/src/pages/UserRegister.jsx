import axios from "axios";
import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const userData = { name, email, password };

      const response = await axios.post(
        backendURL + "/user/register",
        userData, {withCredentials: true}
      );

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center">
      <Link
        to={"/userLogin"}
        className="absolute top-3 right-3 bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 flex items-center gap-1 px-2 py-1 rounded-md"
      >
        <p className="text-lg font-bold">Log In</p>
        <FiLogIn className="text-2xl" />
      </Link>
      <h1 className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent font-bold text-2xl mb-2">
        Create your account
      </h1>
      <div className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 rounded-lg p-[1px] w-75">
        <form
          action=""
          onSubmit={onSubmitHandler}
          className="bg-black rounded-lg p-3 text-white flex flex-col gap-4"
        >
          <input
            className="outline-none border border-white p-3 rounded-lg"
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="outline-none border border-white p-3 rounded-lg"
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="outline-none border border-white p-3 rounded-lg"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 p-3 rounded-lg font-bold text-xl"
          >
            Sign Up
          </button>
        </form>
      </div>
      <p className="text-red-600 text-sm mt-1 w-75 text-center">{error}</p>
    </div>
  );
};
