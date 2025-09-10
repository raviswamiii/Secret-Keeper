import React from "react";
import { Link } from "react-router-dom";

export const SignIn = () => {
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center">
      <h1 className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent font-bold text-2xl mb-2">
        Sign In
      </h1>
      <div className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 rounded-lg p-[1px] w-75">
        <form
          action=""
          className="bg-black rounded-lg p-4 text-white flex flex-col gap-3"
        >
          <input
            className="p-3 outline-none border rounded-md"
            type="email"
            placeholder="Enter your email..."
          />
          <input
            className="p-3 outline-none border rounded-md"
            type="password"
            placeholder="Enter your password..."
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 p-3 rounded-lg font-bold text-xl"
          >
            Sign In
          </button>
        </form>
      </div>
      <Link to={"/signUp"}>
        <p className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent mt-1 text-sm">
          Tap here for Sign Up if you are new.
        </p>
      </Link>
    </div>
  );
};
