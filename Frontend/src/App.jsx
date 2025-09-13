import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { UserRegister } from "./pages/UserRegister";
import { UserLogin } from "./pages/UserLogin";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/userLogin" element={<UserLogin />} />
      </Routes>
    </div>
  );
};
