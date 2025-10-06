import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const userData = { name, email, password };
      const response = await axios.post(backendURL + "/user/signUp", userData, {
        withCredentials: true,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={onSubmitHandler} className="flex flex-col">
        <input
          className="outline-none border"
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="outline-none border"
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="outline-none border"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border" type="submit">
          Sign Up
        </button>
      </form>
      <p>
        <Link to={"/"} className="text-blue-500 underline">
          Sign In{" "}
        </Link>
        if you already have an account.
      </p>
      <p className="text-red-500">{error}</p>
    </div>
  );
};
