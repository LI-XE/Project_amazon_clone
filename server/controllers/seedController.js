const Product = require("../models/productModel");
const User = require("../models/userModel");
const data = require("../data.js");

module.exports = {
  seed: (req, res) => {
    Product.remove({});
    const createdProducts = Product.insertMany(data.products);
    User.remove({});
    const createdUsers = User.insertMany(data.users);
    res.send({ createdProducts, createdUsers });
  },
};
