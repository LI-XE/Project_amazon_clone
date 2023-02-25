const Order = require("../models/orderModel");
const User = require("../models/userModel");
const { isAuth } = require("../config/jwt.config");
const expressAsyncHandler = require("express-async-handler");

module.exports = {
  // my orders
  myOrders: (req, res) => {
    Order.find({ user: req.user._id })
      .then((orders) => {
        if (orders.length === 0) {
          res.status(400).send({ message: "No Order History!" });
        } else {
          console.log(orders);
          res.json(orders);
        }
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // create orders
  createOrders: (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const newOrder = new Order({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      newOrder
        .save()
        .then((order) => {
          console.log(order);
          res.status(201).send({ message: "New Order Created", order });
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    }
  },

  // summary
  getOrderSummary: async (req, res) => {
    const orders = Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const users = User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  },

  // get one order
  getOneOrder: (req, res) => {
    console.log("get One Order");
    console.log(req.params.id);

    Order.findById(req.params.id)
      .then((order) => {
        console.log(order);
        res.json(order);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // get order paied
  orderPay: (req, res) => {
    const order = Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = order.save();
      res.send({ message: "Order Paid", updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found." });
    }
  },

  // get order delivered
  orderDeliver: (req, res) => {
    const order = Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = order.save();
      res.send({ message: "Order Delivered", updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found." });
    }
  },

  // admin orders
  orders: (req, res) => {
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : "";
    const orders = Order.find({ ...sellerFilter })
      .populate("user", "username")
      .then((orders) => {
        res.status(200).send(orders);
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send(err);
      });
  },

  // Delete Order
  deleteOrder: (req, res) => {
    console.log("id: " + req.params.id);
    Order.findByIdAndDelete(req.params.id)
      .then((deletedOrder) => {
        console.log(deletedOrder);
        res.json({ message: "Order is deleted.", order: deletedOrder });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
