const Product = require("../models/productModel");
const data = require("../data.js");

module.exports = {
  // create products
  createProducts: (req, res) => {
    Product.insertMany(data.products)
      .then((createProducts) => {
        console.log(createProducts);
        res.json(createProducts);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // get all products
  products: (req, res) => {
    console.log("All Products List");
    const name = req.query.name || "";
    const category = req.query.category || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      // .populate("seller", "seller.name seller.logo")
      .then((allProducts) => {
        console.log(allProducts);
        res.json(allProducts);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // get one product
  getOneProduct: (req, res) => {
    console.log("get One Product");
    console.log(req.params.id);

    Product.findById(req.params.id)
      .then((product) => {
        console.log(product);
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  deleteProduct: (req, res) => {
    console.log("inside deleteProduct");
    console.log(req.params.id);

    Product.findByIdAndDelete(req.params.id)
      .then((deletedProduct) => {
        console.log(deletedProduct);
        res.json(deletedProduct);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  // Get Categories
  getCategories: (req, res) => {
    Product.find({})
      .distinct("category")
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
