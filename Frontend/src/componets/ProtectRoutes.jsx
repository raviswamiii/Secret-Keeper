import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/signIn");
    }
  },[token, navigate]);
  return <div>{children}</div>;
};
