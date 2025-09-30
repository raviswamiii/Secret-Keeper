import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const userData = { name, email, password };

    try {
      const response = await axios.post(
        backendURL + "/user/register",
        userData,
        { withCredentials: true }
      );

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
    <div className="h-screen flex flex-col justify-center items-center">
      <form className="flex flex-col" onSubmit={onSubmitHandler} action="">
        <input
          className="border outline-none"
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border outline-none"
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border outline-none"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border" type="submit">
          Create Account
        </button>
      </form>
      <Link className="text-blue-500" to={"/"}>
        Go to login
      </Link>
      <p className="text-red-500">{error}</p>
    </div>
  );
};
