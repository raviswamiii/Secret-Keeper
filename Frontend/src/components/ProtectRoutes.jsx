import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [useNavigate, token]);
  return <div>{children}</div>;
};
