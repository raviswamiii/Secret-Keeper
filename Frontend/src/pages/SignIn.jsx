import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const userData = { email, password };
      const response = await axios.post(backendURL + "/user/signIn", userData, {
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
      <form onSubmit={onSubmitHandler} className="flex flex-col" action="">
        <input
          className="outline-none border"
          type="email"
          placeholder="Name..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="outline-none border"
          type="password"
          placeholder="Name..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border" type="submit">
          Sign In
        </button>
      </form>
      <p>
        <Link to={"/signUp"} className="text-blue-500 underline">
          Sign Up{" "}
        </Link>
        if you're new.
      </p>
      <p className="text-red-500">{error}</p>
    </div>
  );
};
