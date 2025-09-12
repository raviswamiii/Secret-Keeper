import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import { ProtectRoutes } from "./componets/ProtectRoutes";

export const App = () => {
  return (
    <div>
      <ToastContainer position="top-right"/>
      <Routes>
        <Route path="/" element={<ProtectRoutes><Home /></ProtectRoutes>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </div>
  );
};
