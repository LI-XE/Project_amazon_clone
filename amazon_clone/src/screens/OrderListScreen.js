import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteOrder, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_ADMIN_RESET } from "../types/orderTypes";

function OrderListScreen(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/seller") >= 0;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const OrderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = OrderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_ADMIN_RESET });
    }
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, successDelete, userInfo, sellerMode]);

  const deleteHandler = (e, order) => {
    e.preventDefault();
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  console.log(orders);

  return (
    <div id="orderhistory">
      <div className="row2">
        <h1>
          Orders <span>( {orders?.length} orders ) </span>
        </h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger"> {error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.username}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small yellow"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      <i className="fa fa-info"></i>
                    </button>
                    <button
                      type="button"
                      className="small red"
                      onClick={(e) => {
                        deleteHandler(e, order);
                      }}
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrderListScreen;
