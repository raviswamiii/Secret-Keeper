import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const userData = { name, email, password };

      const response = await axios.post(
        backendURL + "/user/register",
        userData
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        resetForm();
        navigate("/");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-2 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-800 bg-clip-text text-transparent text-2xl font-bold">
        Create your account
      </h1>
      <div className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-800 p-[2px] rounded-xl">
        <form
          action=""
          onSubmit={onSubmitHandler}
          className="bg-black rounded-xl p-4 text-white text-lg flex flex-col gap-3"
        >
          <input
            className="border px-4 py-2 rounded-lg outline-none"
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border px-4 py-2 rounded-lg outline-none"
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border px-4 py-2 rounded-lg outline-none"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-800 text-xl font-extrabold p-2 flex justify-center items-center rounded-lg text-black "
          >
            Sign Up
          </button>
        </form>
      </div>
      <NavLink
        to={"/signIn"}
        className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent text-sm mt-1"
      >
        Sign In if you already have an account
      </NavLink>
    </div>
  );
};
