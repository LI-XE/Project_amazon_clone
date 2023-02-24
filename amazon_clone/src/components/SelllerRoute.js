import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SellerRoute({ children }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return userInfo && userInfo.isSeller ? children : <Link to="/signin" />;
}

export default SellerRoute;
