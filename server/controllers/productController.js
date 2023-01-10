const Product = require("../models/productModel");
const data = require("../data.js");
const { update } = require("../models/productModel");

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
    const order = req.query.order || "";
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
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      // .populate("seller", "seller.name seller.logo")
      .sort(sortOrder)
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
        product.reviews.reverse();
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

  // create review
  createReview: (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
      .then((product) => {
        if (product.reviews.find((x) => x.name === req.user.username)) {
          res.status(400).json({ message: "You already submitted a review." });
        } else {
          if (product) {
            const review = {
              name: req.user.username,
              rating: Number(req.body.rating),
              comment: req.body.comment,
            };
            // if (review) {
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
              product.reviews.reduce((a, c) => c.rating + a, 0) /
              product.reviews.length;
            console.log(review);
            product.save().then((updatedProduct) => {
              res.status(201).json({
                message: " Review Created. ",
                review: updatedProduct.reviews[0],
              });
            });
            // }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "Product Not Found." });
      });
  },
};
