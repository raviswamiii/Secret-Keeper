import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Form submitted.");
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
          />
          <input
            className="border px-4 py-2 rounded-lg outline-none"
            type="email"
            placeholder="Enter your email..."
          />
          <input
            className="border px-4 py-2 rounded-lg outline-none"
            type="password"
            placeholder="Enter your password..."
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
