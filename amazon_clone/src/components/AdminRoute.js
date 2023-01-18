import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AdminRoute({ children }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return userInfo && userInfo.isAdmin ? children : <Link to="/signin" />;
}

export default AdminRoute;
