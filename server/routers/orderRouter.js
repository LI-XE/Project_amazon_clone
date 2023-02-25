const OrderController = require("../controllers/orderController");
const { isAuth, isAdmin, isSellerOrAdmin } = require("../config/jwt.config");

module.exports = function (app) {
  // admin orders
  app.get("/api/orders", isAuth, isSellerOrAdmin, OrderController.orders);
  // admin delete orders
  app.delete(
    "/api/orders/:id/delete",
    isAuth,
    isAdmin,
    OrderController.deleteOrder
  );

  // my orders
  app.get("/api/orders/mine", isAuth, OrderController.myOrders);
  // create orders
  app.post("/api/orders/create", isAuth, OrderController.createOrders);
  // summary
  app.get(
    "/api/orders/summary",
    isAuth,
    isAdmin,
    OrderController.getOrderSummary
  );
  // // get one Order
  app.get("/api/orders/:id", OrderController.getOneOrder);
  // get order paid
  app.put("/api/orders/:id/pay", isAuth, OrderController.orderPay);
  // get order delivered
  app.put("/api/orders/:id/deliver", isAuth, OrderController.orderDeliver);
};
