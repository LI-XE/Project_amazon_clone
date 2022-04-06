import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { removeFromCart } from "../actions/cartActions";

export default function CartScreen(props) {
  // const productId = props.match.params.id;
  // const [searchParms] = useSearchParams();
  // const qty = props.location.search
  //   ? Number(props.location.search.split("=")[1])
  //   : 1;

  const { id: productId } = useParams();
  const { search } = useLocation();
  const qty = search ? Number(search.split("=")[1]) : 1;

  // console.log({ productId, qty, qtyParam: Number(searchParms.get("qty")) });

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="row">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul className="cart-ul">
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row top">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card1 card-body1">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
              </h2>
            </li>
            <li>
              <button
                type="submit"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
