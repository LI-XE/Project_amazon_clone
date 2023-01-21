import React, { useState, useEffect } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import { listCategories } from "../actions/productActions";

function Header() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // console.log(userInfo);
  const listCategory = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = listCategory;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listCategories());
    // console.log(`categories: ${categories}`);
  }, [dispatch]);

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div>
        <button
          type="button"
          className="sidebar_btn"
          onClick={() => setSidebarIsOpen(true)}
        >
          <i className="fa fa-bars"></i>
        </button>
      </div>
      <aside className={sidebarIsOpen ? "open" : ""}>
        <button
          className="sidebar_close"
          onClick={() => setSidebarIsOpen(false)}
          type="button"
        >
          <i className="fa fa-close"></i>
        </button>
        <ul>
          <strong>Categories</strong>
          {loadingCategory ? (
            <LoadingBox />
          ) : errorCategory ? (
            <MessageBox variant="danger">{errorCategory}</MessageBox>
          ) : (
            categories?.map((cate) => (
              <li key={cate._id}>
                <Link
                  to={`/search/category/${cate}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {cate}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
      {/* <div className="header_search">
        <input className="header_searchInput" type="text" />
        <button>
          <SearchIcon className="header_searchIcon" />
        </button>
      </div> */}
      <div className="header_search">
        <SearchBox />
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
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <Link to="/signin">
              <div className="header_option">
                <span>
                  Admin <i className="fa fa-caret-down"></i>
                </span>
              </div>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/products">Products</Link>
              </li>
              <li>
                <Link to="/admin/orders">Orders</Link>{" "}
              </li>
              <li>
                <Link to="/admin/users">Users</Link>
              </li>
            </ul>
          </div>
        )}
        {/* <Link to="/orderhistory">
          <div className="header_option">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link> */}
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
