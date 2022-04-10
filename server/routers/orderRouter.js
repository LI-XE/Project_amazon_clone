const OrderController = require("../controllers/orderController");
const { isAuth } = require("../config/jwt.config");
const { authenticate } = require("../config/jwt.config");

module.exports = function (app) {
  // my orders
  app.get("/api/orders/mine", isAuth, OrderController.myOrders);
  // create orders
  app.post("/api/orders/create", isAuth, OrderController.createOrders);
  // // get one Order
  app.get("/api/orders/:id", OrderController.getOneOrder);
  // get order paid
  app.put("/api/orders/:id/pay", isAuth, OrderController.orderPay);
};
