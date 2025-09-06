import React from "react";
import { NavLink } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-800 bg-clip-text text-transparent text-2xl font-bold">
        Create your account
      </h1>
      <div className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-800 p-[2px] rounded-xl">
        <form
          action=""
          className="bg-black rounded-xl p-4 text-white text-lg flex flex-col gap-3"
        >
          <input
            className="border px-4 py-2 rounded-lg"
            type="text"
            placeholder="Enter your name..."
          />
          <input
            className="border px-4 py-2 rounded-lg"
            type="text"
            placeholder="Enter your name..."
          />
          <input
            className="border px-4 py-2 rounded-lg"
            type="text"
            placeholder="Enter your name..."
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-800 text-xl font-extrabold p-2 flex justify-center items-center rounded-lg text-black "
          >
            Sign Up
          </button>
        </form>
      </div>
      <NavLink to={'/signIn'} className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent text-sm">Sign In if you already have an account</NavLink>
    </div>
  );
};
