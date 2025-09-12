import React from "react";
import { BiLogOut } from "react-icons/bi";

export const Logout = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-800 rounded-full absolute right-3 top-3 p-1">
      <BiLogOut className="text-2xl rotate-180 rounded-full" />
    </div>
  );
};
