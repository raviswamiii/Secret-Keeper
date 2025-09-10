import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        navigate("/");
        resetForm();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center">
      <h1 className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent font-bold text-2xl mb-2">
        Create your account
      </h1>
      <div className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 rounded-lg p-[1px] w-75">
        <form
          action=""
          onSubmit={onSubmitHandler}
          className="bg-black rounded-lg p-4 text-white flex flex-col gap-3"
        >
          <input
            className="p-3 outline-none border rounded-md"
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="p-3 outline-none border rounded-md"
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="p-3 outline-none border rounded-md"
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
      <Link to={"/signIn"}>
        <p className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent mt-1 text-xs">
          Tap here for Sign In if you already have an account.
        </p>
      </Link>
    </div>
  );
};
