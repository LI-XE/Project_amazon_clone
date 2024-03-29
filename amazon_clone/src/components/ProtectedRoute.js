import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return userInfo ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
