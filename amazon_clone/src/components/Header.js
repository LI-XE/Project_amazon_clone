import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";

function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(userInfo);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <div className="dropdown">
          <Link to="/signin">
            <div className="header_option">
              <span className="header_optionLineOne">
                Hello, {!userInfo ? "Guest" : userInfo.username}
              </span>
              <div className="header_optionLineTwo">
                {/* <Link to="#"> */}
                <span>
                  Account & Lists <i className="fa fa-caret-down"></i>
                </span>
                {/* </Link> */}
              </div>
            </div>
          </Link>
          <ul className="dropdown-content">
            {userInfo ? (
              <>
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>{" "}
                </li>
              </>
            ) : (
              <li>
                <Link to={!userInfo && "/signin"}>SignIn</Link>
              </li>
            )}
          </ul>
        </div>

        <Link to="/orderhistory">
          <div className="header_option">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>

        {/* <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div> */}
        <Link to="/cart">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              {cartItems?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
