import React from "react";
import { Logout } from "./Logout";

export const Home = () => {
  return (
    <div className="h-screen bg-black">
      <Logout />
      <div className="flex flex-col justify-center items-center gap-1 h-full">
        <p className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 bg-clip-text text-transparent">
          You do not have any card.
        </p>
        <button className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 px-6 py-2 rounded-lg font-semibold text-lg">
          Create card
        </button>
      </div>
    </div>
  );
};
